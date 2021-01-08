import React,{ useRef, useCallback} from 'react';
import {
  KeyboardAvoidingView,
  Platform ,
  View,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import  getValidationErrors from '../../utils/getValidationErrors';
import * as ImagePicker from 'react-native-image-picker/';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title ,
  UserAvatarButton,
  UserAvatar,
  BackButton,

} from './styles';

import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';
interface ProfileFormData {
  name: string;
  email: string;
  password: string;
  old_password: string;
  password_confirmation: string;
}

const Profile: React.FC =()=> {
  const { user, updateUser } = useAuth();

  const FormRef = useRef<FormHandles>(null);
  const InputEmailRef = useRef<TextInput>(null);
  const InputOldPasswordRef = useRef<TextInput>(null);
  const InputPasswordRef = useRef<TextInput>(null);
  const InputConfirmPasswordRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        FormRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password')],'Confirmação incorreta'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);


        Alert.alert(
          'Perfil atualizado com sucesso 😀',
        );

        navigation.goBack();

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          FormRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na  atualização do perfil 😥',
          'Ocorreu um erro ao tentar fazer a atualização do perfil, tente novamente!',
        );

      }
    },
    [navigation, updateUser],
  );

  const handleUpdateAvatar = useCallback(()=> {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      maxWidth: 400,
      maxHeight: 400,
    }, response => {
      const source = { uri: response.uri };

      const data  = new FormData();

      data.append('avatar', {
        type: 'image/jpeg',
        name: `${user.id}.jpg`,
        uri: response.uri,
      });

      api.patch('/users/avatar', data).then(apiResponse => {
        updateUser(apiResponse.data);
      });

      console.log(source);
    })
  }, [updateUser, user.id]);

  const handleGoBack = useCallback(()=> {
    navigation.goBack();
  }, [navigation])

  return (
    <>
      <KeyboardAvoidingView style={{flex:1}} enabled behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{flex:1}} >
          <Container>

            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{uri: user.avatar_url}} />
            </UserAvatarButton>

            <View>
              <Title>Meu perfil</Title>
            </View>

            <Form initialData={user} ref={FormRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  InputEmailRef.current?.focus();
                }}
              />

              <Input
                ref={InputEmailRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  InputPasswordRef.current?.focus();
                }}
              />

              <Input
                ref={InputOldPasswordRef}
                name="old_password"
                icon="lock"
                placeholder="Senha Atual"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                containerStyle= {{marginTop: 16}}
                onSubmitEditing={() => {
                  InputPasswordRef.current?.focus();
                }}
              />

              <Input
                ref={InputPasswordRef}
                name="password"
                icon="lock"
                placeholder="Nova Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() => {
                  InputConfirmPasswordRef.current?.focus();
                }}
              />

              <Input
                ref={InputConfirmPasswordRef}
                name="password_confirmation"
                icon="lock"
                placeholder="Confirmar Senha"
                secureTextEntry
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={() => {
                  FormRef.current?.submitForm()
                }}
              />

              <Button onPress={() =>{
                FormRef.current?.submitForm()
              } }>Atualizar</Button>
            </Form>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>


    </>
  );
}

export default Profile;
