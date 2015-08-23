import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';

class ServerActions {
  static receiveLogin(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.LOGIN_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveSignup(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.SIGNUP_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveVerify(errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.VERIFY_RESPONSE,
      errors: errors
    });
  }

  static receiveResetRequest(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.RESET_PASSWORD_REQUEST_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveResetPassword(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.RESET_PASSWORD_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveLogout(errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.LOGOUT_RESPONSE,
      errors: errors
    })
  }

  static receiveProfile(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.PROFILE_RESPONSE,
      json: json,
      errors: errors
    })
  }

  static receiveUser(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_USER_RESPONSE,
      json: json,
      errors: errors
    })
  }

  static receiveEvents(events, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENTS_RESPONSE,
      events: events,
      params: params,
      errors: errors
    })
  }

  static receiveEventSearch(events, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_EVENTS_RESPONSE,
      events: events,
      errors: errors
    })
  }

  static receiveContactSearch(contacts, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_CONTACTS_RESPONSE,
      contacts: contacts,
      errors: errors
    });
  }

  static receiveCreateContact(json, errors) {
    let type = !errors ? ActionTypes.CREATE_CONTACT_SUCCESS_RESPONSE :
                         ActionTypes.CREATE_CONTACT_ERROR_RESPONSE;
    let entity = json && json.contact;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveGetContact(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_CONTACT_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveGetVendor(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_VENDOR_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveCreateEvent(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_EVENT_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveDeleteEvents(ids, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_EVENT_RESPONSE,
      ids: ids,
      errors: errors
    });
  }

  static receiveUpdateEvent(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.UPDATE_EVENT_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveTasks(tasks, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_TASKS_RESPONSE,
      tasks: tasks,
      params: params,
      errors: errors
    })
  }

  static receiveUserSearch(users, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_USERS_RESPONSE,
      users: users,
      errors: errors
    })
  }

  static receiveCreateTask(json, errors) {
    let type = !errors ? ActionTypes.CREATE_TASK_SUCCESS_RESPONSE :
                         ActionTypes.CREATE_TASK_ERROR_RESPONSE;
    let entity = json && json.task;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveEvent(json, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_RESPONSE,
      json: json,
      errors: errors
    });
  }

  static receiveUpdateTask(json, errors) {
    let type = !errors ? ActionTypes.UPDATE_TASK_SUCCESS_RESPONSE :
                         ActionTypes.UPDATE_TASK_ERROR_RESPONSE;
    let entity = json && json.task;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }

  static receiveDeleteTasks(ids, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.DELETE_TASK_RESPONSE,
      ids: ids,
      errors: errors
    });
  }

  static receiveGetContacts(contacts, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_CONTACTS_RESPONSE,
      contacts: contacts,
      params: params,
      errors: errors
    })
  }

  static receiveGetEventContacts(eventContacts, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_CONTACTS_RESPONSE,
      eventContacts: eventContacts,
      params: params,
      errors: errors
    })
  }

  static receiveGetVendors(vendors, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_VENDORS_RESPONSE,
      vendors: vendors,
      params: params,
      errors: errors
    })
  }

  static receiveGetEventVendors(eventVendors, params, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_EVENT_VENDORS_RESPONSE,
      eventVendors: eventVendors,
      params: params,
      errors: errors
    })
  }

  static receiveVendorSearch(vendors, errors) {
    AppDispatcher.handleAction({
      type: ActionTypes.SEARCH_VENDORS_RESPONSE,
      vendors: vendors,
      errors: errors
    });
  }

  static receiveCreateVendor(json, errors) {
    let type = !errors ? ActionTypes.CREATE_VENDOR_SUCCESS_RESPONSE :
                         ActionTypes.CREATE_VENDOR_ERROR_RESPONSE;
    let entity = json && json.vendor;
    AppDispatcher.handleAction({
      type: type,
      entity: entity,
      errors: errors
    });
  }
};

export default ServerActions;
