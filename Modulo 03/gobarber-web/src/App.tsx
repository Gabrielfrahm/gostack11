import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Global from './styles/global';

import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes />
      </AppProvider>

      <Global />
    </BrowserRouter>
  );
};

export default App;
