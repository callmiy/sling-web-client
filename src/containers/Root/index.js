// @flow
import { connect } from 'react-redux';
import Root from './Root';
import {
  getIsAuthenticated,
  getShouldAuthenticate,
  getWebSocketError,
 } from './../../reducers';
import { refresh } from './../../actions/refresh';

export default connect(
  (state) => ({
    isAuthenticated: getIsAuthenticated(state),
    shouldAuthenticate: getShouldAuthenticate(state),
    webSocketError: getWebSocketError(state),
  }),
  { refresh },
)(Root);
