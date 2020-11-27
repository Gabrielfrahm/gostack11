import React, {useCallback, useRef} from 'react';
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
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {useAuth} from '../../hooks/Auth';
import  getValidationErrors from '../../utils/getValidationErrors';
import Icon from 'react-native-vector-icons/Feather';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Title ,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountText,
} from './styles';
import LogoImg from '../../assets/logo.png';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC =()=> {
  const FormRef = useRef<FormHandles>(null)
  const InputPasswordRef = useRef<TextInput>(null);
  const navigation = useNavigation();

  const {signIn, user} = useAuth();

  console.log(user)
  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        FormRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-Mail Obrigatório')
            .email('Digite um Email valido'),
          password: Yup.string().required('Senha obrigatória'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        // vem la do context api de autenticação
        await signIn({
          email: data.email,
          password: data.password,
        });



      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          FormRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login cheque as credenciais',
        );
      }
    },
    [signIn],
  );


  return (
    <>
      <KeyboardAvoidingView style={{flex:1}} enabled behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{flex:1}} >
          <Container>
            <Image  source={LogoImg}/>
            <View>
              <Title>Faça seu logon</Title>
            </View>

            <Form ref={FormRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType='email-address'
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
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                onSubmitEditing={() => {
                  FormRef.current?.submitForm()
                }}
              />

              <Button onPress={() => {
                FormRef.current?.submitForm()
              }}>Entrar</Button>
            </Form>

            <ForgotPassword onPress={() => {}}>
              <ForgotPasswordText>
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => {navigation.navigate('SignUp')}}>
        <Icon name="log-in" size={20} color="#ff9000"/>
        <CreateAccountText>
          Criar Conta
        </CreateAccountText>
      </CreateAccountButton>
    </>
  );
}

export default SignIn;
