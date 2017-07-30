// @flow
import { withRouter } from 'react-router-dom';
import { startSubmit } from 'redux-form';
import { connect } from 'react-redux';
import Login from './Login';
import login from './../../actions/login';

export default withRouter(
  connect(null, { login, startSubmit })(Login),
);
