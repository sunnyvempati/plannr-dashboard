import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';
import EventStore from './EventStore';
import ContactStore from './ContactStore';
import VendorStore from './VendorStore';
import TaskStore from './TaskStore';
import EventContactStore from './EventContactStore';
import EventVendorStore from './EventVendorStore';
import ExpenseCategoryStore from './ExpenseCategoryStore';
import EventExpenseCategoryStore from './EventExpenseCategoryStore';
import ExpenseStore from './ExpenseStore';

class FormStore extends BaseStore {
  constructor() {
    super();
    this._errors = null;
    this._entity = null;
  }

  get errors() { return this._errors; }
  get entity() { return this._entity; }
  set errors(val) { this._errors = val; }
  set entity(val) { this._entity = val; }

  clear() { this._errors = null; this._entity = null; }
}

let _formStoreInstance = new FormStore();

_formStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken,
    UserStore.dispatchToken,
    EventStore.dispatchToken,
    ContactStore.dispatchToken,
    VendorStore.dispatchToken,
    TaskStore.dispatchToken,
    EventContactStore.dispatchToken,
    EventVendorStore.dispatchToken,
    ExpenseCategoryStore.dispatchToken,
    EventExpenseCategoryStore.dispatchToken,
    ExpenseStore.dispatchToken
  ]);

  let action = payload.action;

  switch(action.type) {
    case ActionTypes.LOGIN_RESPONSE:
    case ActionTypes.PROFILE_RESPONSE:
    case ActionTypes.RESET_PASSWORD_REQUEST_RESPONSE:
    case ActionTypes.RESET_PASSWORD_RESPONSE:
    case ActionTypes.SIGNUP_RESPONSE:
    case ActionTypes.CREATE_EVENT_CONTACT_RESPONSE:
    case ActionTypes.CREATE_EVENT_VENDOR_RESPONSE:
      let errors = action.errors;
      if (errors) { _formStoreInstance.errors = errors }
        else _formStoreInstance.clear();
      _formStoreInstance.emitChange();
      break;
    case ActionTypes.UPDATE_EVENT_SUCCESS_RESPONSE:
    case ActionTypes.UPDATE_TASK_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_TASK_SUCCESS_RESPONSE:
    case ActionTypes.UPDATE_VENDOR_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_VENDOR_SUCCESS_RESPONSE:
    case ActionTypes.UPDATE_CONTACT_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_CONTACT_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_EVENT_SUCCESS_RESPONSE:
    case ActionTypes.RESEND_VERIFY_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_FEEDBACK_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_EVENT_EXPENSE_CATEGORY_SUCCESS_RESPONSE:
    case ActionTypes.UPDATE_EVENT_EXPENSE_CATEGORY_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_EXPENSE_SUCCESS_RESPONSE:
    case ActionTypes.UPDATE_EXPENSE_SUCCESS_RESPONSE:
    case ActionTypes.UPDATE_PAYMENT_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_PAYMENT_SUCCESS_RESPONSE:
      _formStoreInstance.entity = action.entity;
      _formStoreInstance.errors = null;
      _formStoreInstance.emitChange();
      break;
    case ActionTypes.UPDATE_EVENT_ERROR_RESPONSE:
    case ActionTypes.CREATE_EVENT_ERROR_RESPONSE:
    case ActionTypes.CREATE_CONTACT_ERROR_RESPONSE:
    case ActionTypes.CREATE_VENDOR_ERROR_RESPONSE:
    case ActionTypes.UPDATE_TASK_ERROR_RESPONSE:
    case ActionTypes.CREATE_TASK_ERROR_RESPONSE:
    case ActionTypes.UPDATE_CONTACT_ERROR_RESPONSE:
    case ActionTypes.UPDATE_VENDOR_ERROR_RESPONSE:
    case ActionTypes.RESEND_VERIFY_ERROR_RESPONSE:
    case ActionTypes.CREATE_FEEDBACK_ERROR_RESPONSE:
    case ActionTypes.CREATE_EVENT_EXPENSE_CATEGORY_ERROR_RESPONSE:
    case ActionTypes.UPDATE_EVENT_EXPENSE_CATEGORY_ERROR_RESPONSE:
    case ActionTypes.CREATE_EXPENSE_ERROR_RESPONSE:
    case ActionTypes.UPDATE_EXPENSE_ERROR_RESPONSE:
    case ActionTypes.UPDATE_PAYMENT_ERROR_RESPONSE:
    case ActionTypes.CREATE_PAYMENT_ERROR_RESPONSE:
      _formStoreInstance.entity = null;
      _formStoreInstance.errors = action.errors;
      _formStoreInstance.emitChange();
    case ActionTypes.RESET:
      _formStoreInstance.clear();
      break;
    case ActionTypes.LOGOUT_RESPONSE:
      if (!SessionStore.isLoggedIn()) _formStoreInstance.clear();
      break;
    default:
  }
});

export default _formStoreInstance;
