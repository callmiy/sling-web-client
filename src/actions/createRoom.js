// @flow
import { stopSubmit } from 'redux-form';
import {
  CREATE_NEW_ROOM,
  NEW_ROOM_FORM_NAME,
  roomUrl,
} from './../constants';
import flattenAjaxError from './flattenAjaxError';

export const createRoom = (channel: Object, room: Object, router: Object) => ({
  channel,
  room,
  type: CREATE_NEW_ROOM,
  cb: (roomId: string) => router.replace(roomUrl(roomId)),
});


export const createRoomFailed = (error: Object) =>
  stopSubmit(NEW_ROOM_FORM_NAME, flattenAjaxError(error));
