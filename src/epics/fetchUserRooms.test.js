// @flow
import { Observable } from 'rxjs/Observable';
import { ActionsObservable } from 'redux-observable';
import fetchUserRooms from './fetchUserRooms';
import * as api from './../actions/api';
import {
  FETCH_USER_ROOMS,
} from './../constants';
import {
  fetchUserRoomsFailed,
  fetchUserRoomsSuccess,
} from './../actions/fetchUserRooms';

describe('fetchUserRoomsRx', () => {
  const action$ = ActionsObservable.of({ type: FETCH_USER_ROOMS });
  const store = null;
  const ajaxSettingRxjs = jest.spyOn(api, 'ajaxSettingRxjs');

  afterEach(() => {
    expect(ajaxSettingRxjs).toHaveBeenCalled();
  });

  test('succeeds', () => {
    const ajaxResponse = {
      response: {
        data: [],
        pagination: {},
      },
    };

    const dependencies = {
      ajax: () => Observable.of(ajaxResponse),
    };

    fetchUserRooms(action$, store, dependencies)
      .toArray()
      .subscribe((actions) => {
        expect(actions).toEqual([
          fetchUserRoomsSuccess(ajaxResponse.response),
        ]);
      });
  });

  test('fails', () => {
    const error = {
      message: 'ajax error 500',
      status: 500,
    };

    const dependencies = {
      ajax: () => Observable.throw(error),
    };

    fetchUserRooms(action$, store, dependencies)
      .toArray()
      .subscribe((actions) => {
        expect(actions).toEqual([fetchUserRoomsFailed(error)]);
      });
  });
});
