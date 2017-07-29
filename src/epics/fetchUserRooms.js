// @flow
import { Observable } from 'rxjs/Observable';
import { ajaxSettingRxjs } from './../actions/api';
import { apiUserRoomsUrl, FETCH_USER_ROOMS } from './../constants';
import {
  fetchUserRoomsFailed,
  fetchUserRoomsSuccess,
} from './../actions/fetchUserRooms';
import type { EpicDependencies } from './../store';

const fetchUserRooms = (
  action$: Object,
  store: any,
  { ajax }: EpicDependencies,
) => action$.ofType(FETCH_USER_ROOMS)
      .switchMap(({ id }) =>
        ajax(ajaxSettingRxjs(apiUserRoomsUrl(id), 'GET'))
          .map(({ response }) => fetchUserRoomsSuccess(response))
          .catch((error) => Observable.of(fetchUserRoomsFailed(error))),
      );

export default fetchUserRooms;
