import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories, Error } from './styles';

import Logo from '../../assets/logo.svg';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const DashBoard: React.FC = () => {
  // isso e para pegar o valor do input
  const [newRepo, setNewRepo] = useState('');
  // interpreta se existe erro na  chamada
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    // procura por repositories salvos na aplicação
    const storagedRepositories = localStorage.getItem(
      '@GithubExplorer:repositories',
    );

    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }
    return [];
  });

  // assim que a variável repositories sofre alteração ele dispara o useEffect executando o localstorage e salvando o repositório nele
  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    // evita que ao clicar em um button vc der submit na pagina
    event.preventDefault();
    // se o usuário nao digitar nada exibe esse erro
    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }
    // evita que ao clicar em um button vc der submit na pagina
    event.preventDefault();
    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputError('');
      console.log(response.data);
    } catch (err) {
      // se  o usuário errar o nome do repositório
      setInputError('Erro ao buscar esse repositório');
    }
  }
  return (
    <>
      <img src={Logo} alt="" />
      <Title>Explore repositórios do Github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          type="text"
          placeholder="pesquise por repositórios no github"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};
export default DashBoard;
