// @flow
import { Observable } from 'rxjs/Observable';
import {
  CREATE_NEW_ROOM,
  CHANNEL_EVENT_NEW_ROOM,
} from './../constants';
import {
  createRoomSuccess,
  createRoomFailed,
  newRoomUrl,
} from './../actions/createRoom';

const createRoom = (action$: Object) =>
  action$.ofType(CREATE_NEW_ROOM)
    .switchMap(({ channel, room }) =>
      Observable.create((observer) => {
        if (!channel) {
          return () => {};
        }

        channel
          .push(CHANNEL_EVENT_NEW_ROOM, room)
          .receive('ok', ({ room_id }) =>
            observer.next(Observable.of(
              createRoomSuccess(room_id), newRoomUrl(room_id),
            )),
          )
          .receive('error', ({ errors }) =>
            observer.next(Observable.of(
              createRoomFailed(errors),
            )),
          );

        return () => {};
      }),
    )
    .switchMap((val$) => val$);

export default createRoom;
