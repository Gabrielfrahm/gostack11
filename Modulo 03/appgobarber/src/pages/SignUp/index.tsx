import React,{ useRef, useCallback} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform ,
  View,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import  getValidationErrors from '../../utils/getValidationErrors';

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import Icon from 'react-native-vector-icons/Feather';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title ,
  BackToSignInButton,
  BackToSignInText,
} from './styles';
import LogoImg from '../../assets/logo.png';
import api from '../../services/api';
interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC =()=> {
  const FormRef = useRef<FormHandles>(null);
  const InputEmailRef = useRef<TextInput>(null);
  const InputPasswordRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        FormRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .required('E-Mail Obrigatório')
            .email('Digite um Email valido'),
          password: Yup.string().min(6, 'no Mínimo 6 dígitos'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await api.post('/users', data);

        navigation.goBack();

        Alert.alert(
          'Cadastrado com sucesso',
          'Você ja pode fazer seu logon no Go Barber!',
        );

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          FormRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro no Cadastro',
          'Ocorreu um erro ao tentar fazer o cadastro, tente novamente!',
        );

      }
    },
    [navigation],
  );

  return (
    <>
      <KeyboardAvoidingView style={{flex:1}} enabled behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{flex:1}} >
          <Container>
            <Image  source={LogoImg}/>
            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Form ref={FormRef} onSubmit={handleSignUp}>
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
                ref={InputPasswordRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                secureTextEntry
                textContentType="newPassword"
                onSubmitEditing={() => {
                  FormRef.current?.submitForm()
                }}
              />

              <Button onPress={() =>{
                FormRef.current?.submitForm()
              } }>Cadastrar</Button>
            </Form>

          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignInButton onPress={() => {navigation.goBack()}}>
        <Icon name="arrow-left" size={20} color="#fff"/>
        <BackToSignInText>
          Voltar para logon
        </BackToSignInText>
      </BackToSignInButton>
    </>
  );
}

export default SignUp;
