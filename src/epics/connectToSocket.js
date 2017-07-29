// @flow
import { Observable } from 'rxjs/Observable';
import { Socket } from 'phoenix';
import {
  getWebSocketUrl,
  CONNECT_TO_SOCKET,
  SOCKET_CONNECTED,
  WEBSOCKET_ERROR,
} from './../constants';
import { readSession } from './../authManager';

const socketObservable = Observable.create((observer: Object) => {
  const socket = new Socket(`${getWebSocketUrl()}/socket`, { params: {
    token: readSession(),
  } });

  socket.connect();

  socket.onOpen(() =>
      observer.next({ type: SOCKET_CONNECTED, socket }),
  );

  socket.onError((error) =>
      observer.next({ type: WEBSOCKET_ERROR, error }),
  );

  return () => {
    // socket.disconnect();
  };
});

const connectToSocket = (
  action$: Object,
) => action$.ofType(CONNECT_TO_SOCKET)
.switchMap(() =>
  socketObservable
    .catch((error) => Observable.of(error)),
);

export default connectToSocket;
