import React from 'react';
import { Form } from '@unform/web';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import LogoImg from '../../assets/logo.svg';

import { Container, Content, BackgroundIMG } from './styles';

const SignUp: React.FC = () => {
  function handleSubmit(data: any): void {
    console.log(data);
  }

  return (
    <>
      <Container>
        <BackgroundIMG />
        <Content>
          <img src={LogoImg} alt="Go Barber" />

          <Form onSubmit={handleSubmit}>
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

          <a href="login ">
            <FiArrowLeft />
            Voltar para logon
          </a>
        </Content>
      </Container>
    </>
  );
};

export default SignUp;
