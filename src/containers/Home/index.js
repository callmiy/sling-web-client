// @flow
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { startSubmit } from 'redux-form';
import {
  getAllRooms,
  getAllRoomsIds,
  getRoomsChannel,
  getRoomsPagination,
} from './../../reducers';
import Home from './Home';
import { fetchRooms } from './../../actions/fetchRooms';
import { createRoom } from './../../actions/createRoom';

export default withRouter(
  connect(
    (state) => ({
      rooms: getAllRooms(state),
      currentUserRoomsIds: getAllRoomsIds(state),
      pagination: getRoomsPagination(state),
      roomsChannel: getRoomsChannel(state),
    }),
    {
      fetchRooms,
      createRoom,
      startSubmit,
    },
  )(Home),
);
