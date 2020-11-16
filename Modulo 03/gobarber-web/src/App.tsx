import React from 'react';
import Global from './styles/global';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App: React.FC = () => {
  return (
    <>
      <SignIn />
      <Global />
    </>
  );
};

export default App;
