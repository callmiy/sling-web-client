// @flow
import React from 'react';
import Navbar from './../../components/Navbar';
import SignUpForm from './../../components/SignUpForm';

export default (props: Object) => {
  const { history, signup } = props;

  return (
    <div>
      <Navbar />
      <SignUpForm onSubmit={(user) => signup(user, history)} />
    </div>
  );
};
