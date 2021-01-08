import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import asyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
}
interface AuthState {
  token: string;
  userWithoutPassword: User;
}



interface SignInCredentials {
  email: string;
  password: string;
}



interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading:  boolean;
  updateUser(user: User): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  // starta a variável com base no localStorage
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
  //   async function loadStoragedData(): Promise<void>{
  //     const token = await AsyncStorage.getItem('@GoBarber:token');
  //     const userWithoutPassword = await AsyncStorage.getItem('@GoBarber:user');


  //     if(token && userWithoutPassword) {
  //       setData({
  //         token,
  //         userWithoutPassword: JSON.parse(userWithoutPassword[1]),
  //       });
  //       api.defaults.headers.authorization = `Bearer ${token[1]}`;
  //     }
  //     setLoading(false);
  //   }


  //   loadStoragedData();
  // }, [])
  async function loadStoragedData(): Promise<void> {
    const [token, userWithoutPassword] = await AsyncStorage.multiGet([
      '@GoBarber:token',
      '@GoBarber:user',
    ]);

    if (token[1] && userWithoutPassword[1]) {
      api.defaults.headers.authorization = `Bearer ${token[1]}`;

      setData({ token: token[1], userWithoutPassword: JSON.parse(userWithoutPassword[1]) });
    }

    setLoading(false);
  }

  loadStoragedData();
}, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, userWithoutPassword } = response.data;

    await asyncStorage.multiSet([
      ['@GoBarber:token' , token],
      ['@GoBarber:user', JSON.stringify(userWithoutPassword) ],
    ]);

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, userWithoutPassword });
  }, []);

  const signOut = useCallback(async () => {
    await asyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);


    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    async (user: User) => {
      await asyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
      setData({
        token: data.token,
        userWithoutPassword: user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.userWithoutPassword, signIn, signOut ,updateUser,  loading}}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an  AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
