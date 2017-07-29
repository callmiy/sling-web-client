// @flow
import { stopSubmit } from 'redux-form';
import {
  CREATE_NEW_ROOM,
  CREATE_NEW_ROOM_SUCCESS,
  NEW_ROOM_URL,
  RESET_NEW_ROOM_URL,
  NEW_ROOM_FORM_NAME,
  roomUrl,
} from './../constants';
import flattenAjaxError from './flattenAjaxError';

export const createRoom = (channel: Object, room: Object) => ({
  channel,
  room,
  type: CREATE_NEW_ROOM,
});

export const createRoomSuccess = (roomId: string) => ({
  roomId,
  type: CREATE_NEW_ROOM_SUCCESS,
});

export const newRoomUrl = (roomId: string) => ({
  type: NEW_ROOM_URL,
  url: roomUrl(roomId),
});

export const resetNewRoomUrl = () => ({
  type: RESET_NEW_ROOM_URL,
});


export const createRoomFailed = (error: Object) =>
  stopSubmit(NEW_ROOM_FORM_NAME, flattenAjaxError(error));
