// @flow
import { SubmissionError } from 'redux-form';
import api, { headers } from './api';
import { handlePromiseRejection } from './utils';
import {
  API_ROOMS_URL,
  CONNECTED_TO_ROOMS_UTILS_CHANNEL_SUCCESS,
  CREATE_ROOM_SUCCESS,
  DISCONNECTED_FROM_ROOMS_UTILS_CHANNEL,
  FETCH_ROOMS_SUCCESS,
  ROOM_JOINED,
  CHANNEL_EVENT_LOAD_ROOMS,
  CHANNEL_EVENT_NEW_ROOM,
  CHANNEL_EVENT_ROOM_CREATED,
  roomUrl,
} from './../constants';

export const connectToRoomsUtilsChannel = (socket: Object, userId: string) =>
  (dispatch: (Object) => mixed) => {
    if (!socket) {
      return;
    }

    const channel = socket.channel('rooms:utils');

    channel.on(CHANNEL_EVENT_ROOM_CREATED, (response: { meta: Object }) => {
      const { user_id, status } = response.meta;

      if (status === 'new') {
        dispatch({
          type: CREATE_ROOM_SUCCESS,
          response,
        });
      }

      if (user_id === userId) {
        dispatch({
          type: ROOM_JOINED,
          response,
        });
      }
    },
    );

    channel.join().receive('ok', () => dispatch({
      type: CONNECTED_TO_ROOMS_UTILS_CHANNEL_SUCCESS,
      channel,
    }));
  };

export const leaveRoomsUtilsChannel = (channel: Object) =>
  (dispatch: (Object) => mixed) => {
    if (channel) {
      channel.leave();
    }

    dispatch({
      type: DISCONNECTED_FROM_ROOMS_UTILS_CHANNEL,
    });
  };

export const fetchRooms = (params: Object) =>
  (dispatch: (Object) => mixed) =>
    api.get(API_ROOMS_URL, { params, ...headers() })
      .then(({ data }) => {
        dispatch({
          response: data,
          type: FETCH_ROOMS_SUCCESS,
        });
      })
      .catch((error) => handlePromiseRejection(error));

export const fetchRoomsChannel = (channel: Object, params: Object) =>
  (dispatch: (Object) => mixed) => {
    if (!channel) {
      return;
    }

    channel
      .push(CHANNEL_EVENT_LOAD_ROOMS, params)
      .receive('ok', (response) => dispatch({
        type: FETCH_ROOMS_SUCCESS,
        response,
      }));
  };

export const createRoom = (room: Object, router: Object) =>
  (dispatch: (Object) => mixed) =>
    api.post(API_ROOMS_URL, room, headers())
      .then(({ data }) => {
        dispatch({
          type: CREATE_ROOM_SUCCESS,
          response: data,
        });

        router.replace(roomUrl(data.data.id));
      })
      .catch((error) => {
        if (!room.id && error.response) {
          throw new SubmissionError({
            _error: error.response.data.errors,
          });
        }

        handlePromiseRejection(error);
      });

export const createRoomChannel = (
  channel: Object,
  room: Object,
  router: Object,
) => () => {
  if (!channel) {
    return null;
  }

  const p = new Promise((resolve, reject) =>
    channel
      .push(CHANNEL_EVENT_NEW_ROOM, room)
      .receive('ok', ({ room_id }) => {
        router.replace(roomUrl(room_id));
      })
      .receive('error', ({ errors }) => reject(errors)),
    );

  return p.catch((errors) => {
    throw new SubmissionError({ _error: errors });
  });
};
