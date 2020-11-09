import React, { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories } from './styles';
import Logo from '../../assets/logo.svg';
import api from '../../services';

// eslint-disable-next-line arrow-body-style
const DashBoard: React.FC = () => {
  return (
    <>
      <img src={Logo} alt="" />
      <Title>Explore repositórios do Github</Title>

      <Form>
        <input type="text" placeholder="pesquise por repositórios no github" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
            src="https://avatars1.githubusercontent.com/u/49403676?s=460&u=33f5b16ad60402d062a7bc30b166e291960ef4a4&v=4"
            alt="img de perfil"
          />
          <div>
            <strong>Teste/Teste</strong>
            <p>🚀 teste teste</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars1.githubusercontent.com/u/49403676?s=460&u=33f5b16ad60402d062a7bc30b166e291960ef4a4&v=4"
            alt="img de perfil"
          />
          <div>
            <strong>Teste/Teste</strong>
            <p>🚀 teste teste</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="teste">
          <img
            src="https://avatars1.githubusercontent.com/u/49403676?s=460&u=33f5b16ad60402d062a7bc30b166e291960ef4a4&v=4"
            alt="img de perfil"
          />
          <div>
            <strong>Teste/Teste</strong>
            <p>🚀 teste teste</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};
export default DashBoard;
