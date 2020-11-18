import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../service/api';
import { useToast } from '../../hooks/Toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import LogoImg from '../../assets/logo.svg';

import {
  Container,
  Content,
  BackgroundIMG,
  AnimationContainer,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});
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

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado',
          description: 'Você ja pode fazer seu logon no Go Barber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no Cadastro',
          description:
            'Ocorreu um erro ao tentar fazer o cadastro, tente novamente!',
        });
      }
    },
    [addToast, history],
  );

  return (
    <>
      <Container>
        <BackgroundIMG />
        <Content>
          <AnimationContainer>
            <img src={LogoImg} alt="Go Barber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu cadastro</h1>

              <Input name="name" icon={FiUser} placeholder="Nome" />
              <Input name="email" icon={FiMail} placeholder="E-Mail" />
              <Input
                name="password"
                icon={FiLock}
                type="password"
                placeholder="Senha"
              />

              <Button type="submit">Cadastrar</Button>
            </Form>

            <Link to="/">
              <FiArrowLeft />
              Voltar para logon
            </Link>
          </AnimationContainer>
        </Content>
      </Container>
    </>
  );
};

export default SignUp;
