// @flow
import { Observable } from 'rxjs/Observable';
import { ajaxSettingRxjs } from './../actions/api';
import onAuthSuccess from './../actions/onAuthSuccess';

type argsType = {
  errorCb: (any) => Object,
 }

export const authCbAction = (cb) => ({ type: 'callback', cb });

export default (
  action$: Object,
  store: any,
   ajax: (any) => Observable<*>,
  type: string,
  { errorCb }: argsType,
) => action$
      .ofType(type)
      .switchMap(({ url, user, cb }) =>
        ajax(ajaxSettingRxjs(url, 'POST', { body: user }))
          .map(({ response }) => Observable.of(
            ...onAuthSuccess(response),
            authCbAction(cb),
          ))
          .catch((error) => Observable.throw(error)),
      )
      .switchMap((x) => x)
      .do(({ cb }) => {
        if (cb) {
          cb();
        }
      })
      .catch((error) => Observable.of(errorCb(error)));