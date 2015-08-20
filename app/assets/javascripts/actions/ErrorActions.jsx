import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import {ActionTypes} from '../constants/AppConstants.jsx';

class ErrorActions {
  static reset() {
    AppDispatcher.handleViewAction({
      type: ActionTypes.RESET_ERRORS
    });
  }
};

export default ErrorActions;
