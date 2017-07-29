// @flow
import React from 'react';
import LoginForm from './../../components/LoginForm';
import Navbar from './../../components/Navbar';

type propType = {
  login: (Object) => void,
  history: Object,
}

const Login = (props: propType) => {
  const { login, history } = props;

  return (
    <div>
      <Navbar />
      <LoginForm onSubmit={(user) => login(user, history)} />
    </div>
  );
};

export default Login;
