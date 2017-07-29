// @flow
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import SignUp from './SignUp';
import { signup } from './../../actions/signup';

export default withRouter(
  connect(
    null,
    { signup },
  )(SignUp),
);
