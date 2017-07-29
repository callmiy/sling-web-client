// @flow
import { Observable } from 'rxjs/Observable';
import {
  CONNECT_TO_ROOMS_UTILS_CHANNEL,
  CHANNEL_EVENT_ROOM_CREATED,
  CREATE_ROOM_SUCCESS,
  ROOM_JOINED,
} from './../constants';
import {
  connectToRoomsUtilsChannelSuccess,
} from './../actions/connectToRoomsUtilsChannel';

const connectToRoomsUtilsChannel = (action$: Object) =>
  action$.ofType(CONNECT_TO_ROOMS_UTILS_CHANNEL)
    .switchMap(({ socket, userId }) => Observable.create((observer) => {
      if (!socket) {
        return () => {};
      }

      const channel = socket.channel('rooms:utils');

      channel.on(CHANNEL_EVENT_ROOM_CREATED, (response: { meta: Object }) => {
        const { user_id, status } = response.meta;

        if (status === 'new') {
          observer.next({
            type: CREATE_ROOM_SUCCESS,
            response,
          });
        }

        if (user_id === userId) {
          observer.next({
            type: ROOM_JOINED,
            response,
          });
        }
      });

      channel.join().receive('ok', () => observer.next(
        connectToRoomsUtilsChannelSuccess(channel),
      ));

      return () => {};
    }));

export default connectToRoomsUtilsChannel;
