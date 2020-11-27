import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import asyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import AsyncStorage from '@react-native-community/async-storage';

interface AuthState {
  token: string;
  userWithoutPassword: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  loading:  boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  // starta a variável com base no localStorage
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadStoragedData(): Promise<void>{
      const token = await AsyncStorage.getItem('@GoBarber:token');
      const userWithoutPassword = await AsyncStorage.getItem('@GoBarber:user');


      if(token && userWithoutPassword) {
        setData({
          token,
          userWithoutPassword: JSON.parse(userWithoutPassword[1]),
        });
      }
      setLoading(false);
    }


    loadStoragedData();
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, userWithoutPassword } = response.data;

    await asyncStorage.multiSet([
      ['@GoBarber:token' , token],
      ['@GoBarber:user', JSON.stringify(userWithoutPassword) ]
    ])
    setData({ token, userWithoutPassword });
  }, []);

  const signOut = useCallback(async () => {
    await asyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);


    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: data.userWithoutPassword, signIn, signOut , loading}}
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
