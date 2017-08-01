// @flow
import { Observable } from 'rxjs/Observable';
import { Socket } from 'phoenix';
import {
  getWebSocketUrl,
  CONNECT_TO_SOCKET,
} from './../constants';
import { readSession } from './../authManager';
import {
  socketConnected,
  socketError,
} from './../actions/connectToSocket';

const socketObservable = Observable.create((observer: Object) => {
  const socket = new Socket(`${getWebSocketUrl()}/socket`, { params: {
    token: readSession(),
  } });

  socket.connect();

  socket.onOpen(() =>
      observer.next(socketConnected(socket)),
  );

  socket.onError((error) =>
      observer.next(socketError(error)),
  );

  return () => {
    // socket.disconnect();
  };
});

export default (
  action$: Object,
) => action$.ofType(CONNECT_TO_SOCKET)
.switchMap(() =>
  socketObservable
    .catch((error) => Observable.of(error)),
);
