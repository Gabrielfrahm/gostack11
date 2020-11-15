import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import Input from '../../components/Input';
import Button from '../../components/Button';

import LogoImg from '../../assets/logo.svg';

import { Container, Content, BackgroundIMG } from './styles';

const SignIn: React.FC = () => {
  return (
    <>
      <Container>
        <Content>
          <img src={LogoImg} alt="Go Barber" />

          <form>
            <h1>Faça seu logon</h1>

            <Input name="email" icon={FiMail} placeholder="E-Mail" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button>Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </form>

          <a href="login ">
            <FiLogIn />
            Criar conta
          </a>
        </Content>

        <BackgroundIMG />
      </Container>
    </>
  );
};

export default SignIn;
