import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';
import BaseStore from './BaseStore';
import CacheStore from './CacheStore';
import SessionStore from './SessionStore';
import UserStore from './UserStore';
import EventStore from './EventStore';
import extend from 'extend';


class EventExpenseCategory extends BaseStore {
  constructor() {
    super();
    this._cache = new CacheStore();
    this._eventExpenseCategories = [];
    this._searchResults = [];
  }

  get searchResults() { return this._searchResults; }
  setSearchResults(results) { this._searchResults = results; }

  getFromCache(params) {
    let categoryIds = this._cache.getItems(params);
    if (categoryIds) {
      return categoryIds.map((category) => {
        return this._eventExpenseCategories[category];
      });
    };
  }

  addCategories(categories, params) {
    this._cache.createContext(params);
    let estimated = 0, eventId = params.with_event_id;
    if (categories.length > 0) {
      categories.forEach((category) => {
        // add to global
        if (eventId) estimated += category.budget;
        this._eventExpenseCategories[category.id] = category;
        // then add to cache
        this._cache.add(category.id, params);
      });
      if (eventId) EventStore.setTotals(eventId, estimated);
    }
  }

  get(id) {
    return this._eventExpenseCategories[id];
  }

  add(eventExpenseCategory) {
    this._eventExpenseCategories[eventExpenseCategory.id] = eventExpenseCategory;
    let eventId = eventExpenseCategory.event_id;
    this.setEventTotals(eventId);
    this._cache.clear();
  }

  setEventTotals(eventId) {
    let estimated = 0, expenses = 0;
    Object.keys(this._eventExpenseCategories).forEach((key) => {
      let category = this._eventExpenseCategories[key];
      if (category.event_id == eventId) {
        expenses += category.expense_total;
        estimated += category.budget;
      }
    });
    EventStore.setTotals(eventId, estimated, expenses);
  }

  addExpenseTotal(id, expenseTotal) {
    let eventExpenseCategory = this.get(id);
    eventExpenseCategory.expense_total = expenseTotal;
    this.setEventTotals(eventExpenseCategory.event_id);
  }

  remove(id) {
    delete this._eventExpenseCategories[id];
    this._cache.clear();
  }

  clear() {
    this._eventExpenseCategories = [];
    this._cache.clear();
  }
}

let _eventExpenseCategoryStoreInstance = new EventExpenseCategory();

_eventExpenseCategoryStoreInstance.dispatchToken = AppDispatcher.register((payload) => {
  AppDispatcher.waitFor([
    SessionStore.dispatchToken,
    UserStore.dispatchToken
  ]);
  let action = payload.action;

  switch(action.type) {
    case ActionTypes.GET_EVENT_EXPENSE_CATEGORIES_RESPONSE:
      if (action.expenseCategories) {
        _eventExpenseCategoryStoreInstance.addCategories(action.expenseCategories, action.params);
      }
      _eventExpenseCategoryStoreInstance.emitChange();
      break;
    case ActionTypes.LOGOUT_RESPONSE:
      if (!SessionStore.isLoggedIn()) _eventExpenseCategoryStoreInstance.clear();
      break;
    case ActionTypes.SEARCH_EVENT_EXPENSE_CATEGORIES_RESPONSE:
      if (!action.errors) {
        _eventExpenseCategoryStoreInstance.setSearchResults(action.eventExpenseCategories);
        _eventExpenseCategoryStoreInstance.emitChange();
      }
      break;
    case ActionTypes.UPDATE_EVENT_EXPENSE_CATEGORY_SUCCESS_RESPONSE:
    case ActionTypes.CREATE_EVENT_EXPENSE_CATEGORY_SUCCESS_RESPONSE:
      _eventExpenseCategoryStoreInstance.add(action.entity);
      _eventExpenseCategoryStoreInstance.emitChange();
      break;
    case ActionTypes.GET_EVENT_EXPENSE_CATEGORY_RESPONSE:
      let eventExpenseCategory = action.json && action.json.event_expense_category;
      if (eventExpenseCategory) _eventExpenseCategoryStoreInstance.add(eventExpenseCategory);
      _eventExpenseCategoryStoreInstance.emitChange();
      break;
    case ActionTypes.DELETE_EVENT_EXPENSE_CATEGORY_RESPONSE:
      if (!action.errors) {
        _eventExpenseCategoryStoreInstance.remove(action.id);
        _eventExpenseCategoryStoreInstance.emitChange();
      }
      break;
    default:
  }

  return true;
});

export default _eventExpenseCategoryStoreInstance;
