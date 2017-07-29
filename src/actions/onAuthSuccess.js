// @flow
import { writeSession } from './../authManager';
import connectToSocket from './../actions/connectToSocket';
import authenticationSuccess from './../actions/authenticationSuccess';
import { fetchUserRooms } from './../actions/fetchUserRooms';

export default (response: Object) => {
  writeSession(response.meta.token);
  return [
    authenticationSuccess(response),
    fetchUserRooms(response.data.id),
    connectToSocket(),
  ];
};
