import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';
import EventStore from './EventStore';
import ContactStore from './ContactStore';

class ErrorStore extends BaseStore {
  constructor() {
    super();
    this._errors = null;
  }

  get errors() { return this._errors; }
  set errors(val) { this._errors = val; }

  clear() { this._errors = null; }
}

let _errorStoreInstance = new ErrorStore();

_errorStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken,
    UserStore.dispatchToken,
    EventStore.dispatchToken,
    ContactStore.dispatchToken
  ]);

  let action = payload.action;

  switch(action.type) {
    case ActionTypes.LOGIN_RESPONSE:
    case ActionTypes.PROFILE_RESPONSE:
    case ActionTypes.RESET_PASSWORD_REQUEST_RESPONSE:
    case ActionTypes.RESET_PASSWORD_RESPONSE:
    case ActionTypes.SIGNUP_RESPONSE:
    case ActionTypes.CREATE_EVENT_CLIENT_RESPONSE:
    case ActionTypes.UPDATE_EVENT_RESPONSE:
    case ActionTypes.CREATE_EVENT_RESPONSE:
    case ActionTypes.CREATE_TASK_RESPONSE:
      let errors = action.errors;
      if (errors) { _errorStoreInstance.errors = errors }
        else _errorStoreInstance.clear();
      _errorStoreInstance.emitChange();
      break;

    case ActionTypes.RESET_ERRORS:
      _errorStoreInstance.clear();
      _errorStoreInstance.emitChange();
      break;
    default:
  }
});

export default _errorStoreInstance;
