// @flow
import {
  FETCH_USER_ROOMS_SUCCESS,
  FETCH_USER_ROOMS_FAILED,
  FETCH_USER_ROOMS,
} from './../constants';

export const fetchUserRoomsSuccess = (response: Object) =>
  ({ response, type: FETCH_USER_ROOMS_SUCCESS });


export const fetchUserRoomsFailed = (error: Object) =>
  ({ error, type: FETCH_USER_ROOMS_FAILED });

export const fetchUserRooms = (id: string) =>
  ({ id, type: FETCH_USER_ROOMS });
