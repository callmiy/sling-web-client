// @flow
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getAllRooms,
  getAllRoomsIds,
  getRoomsChannel,
  getRoomsPagination,
  getSocket,
  getUser,
  getNewRoomUrl,
} from './../../reducers';
import Home from './Home';
import { fetchRooms } from './../../actions/fetchRooms';
import { createRoom } from './../../actions/createRoom';
import {
  leaveRoomsUtilsChannel,
 } from './../../actions/leaveRoomsUtilsChannel';

import {
  connectToRoomsUtilsChannel,
 } from './../../actions/connectToRoomsUtilsChannel';

export default withRouter(
  connect(
    (state) => ({
      rooms: getAllRooms(state),
      currentUserRoomsIds: getAllRoomsIds(state),
      pagination: getRoomsPagination(state),
      socket: getSocket(state),
      roomsChannel: getRoomsChannel(state),
      userId: getUser(state).id,
      newRoomUrl: getNewRoomUrl(state),
    }),
    {
      fetchRooms,
      createRoom,
      leaveRoomsUtilsChannel,
      connectToRoomsUtilsChannel,
    },
  )(Home),
);
