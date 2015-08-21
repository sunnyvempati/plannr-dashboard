import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';

class ToastActions {
  static toast(message) {
    AppDispatcher.handleAction({
      type: ActionTypes.TOAST_MESSAGE,
      message: message
    });
  }

  static toastError(message) {
    AppDispatcher.handleAction({
      type: ActionTypes.TOAST_ERROR,
      message: message
    });
  }

  static loading() {
    AppDispatcher.handleAction({
      type: ActionTypes.TOAST_LOADING
    });
  }

  static close() {
    AppDispatcher.handleAction({
      type: ActionTypes.CLOSE_TOAST
    })
  }
};

export default ToastActions;
