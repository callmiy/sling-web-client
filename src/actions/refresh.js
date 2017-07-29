// @flow
import {
  REFRESH_SESSION,
  API_REFRESH_URL,
  REFRESH_SUCCESS,
  REFRESH_FAILED,
 } from './../constants';


export const refresh = () =>
  ({ url: API_REFRESH_URL, type: REFRESH_SESSION });

export const refreshFailed = (error: Object) =>
  ({ error, type: REFRESH_FAILED });
