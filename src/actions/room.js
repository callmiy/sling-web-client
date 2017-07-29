// @flow
import { Presence } from 'phoenix';
import { SubmissionError } from 'redux-form';
import { uniqBy } from 'lodash';
import {
  apiRoomMessagesUrl,
  apiRoomUrl,
  FETCH_MESSAGES_FAIL,
  FETCH_MESSAGES_REQUEST,
  FETCH_MESSAGES_SUCCESS,
  MESSAGE_CREATED,
  NEW_MESSAGE_FORM,
  ROOM_CONNECTED_TO_CHANNEL,
  ROOM_PRESENCE_UPDATE,
  UPDATE_ROOM_SUCCESS,
  USER_LEFT_ROOM,
  CHANNEL_EVENT_MESSAGE_CREATED,
  CHANNEL_EVENT_NEW_MESSAGE,
} from './../constants';
import api, { headers } from './api';
import { handlePromiseRejection } from './utils';

const dispatchPresences = ({ users }: Object, dispatch: (Object) => mixed) => {
  dispatch({
    type: ROOM_PRESENCE_UPDATE,
    presentUsers: uniqBy(users.metas, 'id'),
  });
};

export const connectToChannel = (socket: Object, roomId: string) =>
  (dispatch: (Object) => mixed) => {
    if (!socket) {
      return;
    }

    const channel = socket.channel(`rooms:${roomId}`);
    let presences = {};

    channel.on('presence_state', (state: Object) => {
      dispatchPresences(state, dispatch);
    });

    channel.on('presence_diff', (diff: Object) => {
      presences = Presence.syncDiff(presences, diff);
      dispatchPresences(presences, dispatch);
    });

    channel.on(CHANNEL_EVENT_MESSAGE_CREATED, (message: Object) => {
      dispatch({
        type: MESSAGE_CREATED,
        message,
      });
    });

    channel.join().receive('ok', (response: Object) => {
      dispatch({
        type: ROOM_CONNECTED_TO_CHANNEL,
        response,
        channel,
      });
    });
  };

export const leaveChannel = (channel: Object) =>
  (dispatch: (Object) => mixed) => {
    if (channel) {
      channel.leave();
    }

    dispatch({
      type: USER_LEFT_ROOM,
    });
  };

export const createMessage = (message: Object,
                              channel: Object,
                              reset: (string) => mixed) =>
  new Promise((resolve, reject) => {
    channel
      .push(CHANNEL_EVENT_NEW_MESSAGE, message)
      .receive('ok', () => resolve(
        reset(NEW_MESSAGE_FORM),
      ))
      .receive('error', () => reject());
  });

export const loadOlderMessages = ({ roomId, params }: Object) =>
  (dispatch: (Object) => mixed) => {
    dispatch({
      type: FETCH_MESSAGES_REQUEST,
    });
    return api
      .get(apiRoomMessagesUrl(roomId), { params, ...headers() })
      .then((response) => dispatch({
        type: FETCH_MESSAGES_SUCCESS,
        response,
      }))
      .catch((error) => handlePromiseRejection(error, () => dispatch({
        type: FETCH_MESSAGES_FAIL,
      })));
  };

export const updateRoom = (update: Object,
                           dispatch: (Object) => mixed,
                           roomId: string) =>
  api
    .patch(apiRoomUrl(roomId), { room: update }, headers())
    .then(({ data }) => dispatch({
      type: UPDATE_ROOM_SUCCESS,
      response: data,
    }))
    .catch((error) => {
      if (error.response) {
        let server_error = 'Unknown error!';
        if (error.response.data.errors) {
          server_error = error.response.data.errors;
        }
        throw new SubmissionError({ _error: server_error });
      }

      handlePromiseRejection(error);
    });
