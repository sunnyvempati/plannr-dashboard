import AppDispatcher from '../dispatcher/AppDispatcher';
import {ActionTypes} from '../constants/AppConstants';
import TaskService from '../services/TaskService';
import TaskStore from '../stores/TaskStore';

class TaskActions {
  static getTasks(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.GET_TASKS_REQUEST,
      params: params
    });
    if (TaskStore.isCached(params)) {
      AppDispatcher.handleAction({
        type: ActionTypes.GET_CACHED_TASKS_RESPONSE,
        params: params
      })
    } else {
      TaskService.getTasks(params);
    }
  }

  static create(params) {
    AppDispatcher.handleAction({
      type: ActionTypes.CREATE_TASK_REQUEST,
      params: params
    })
    TaskService.create(params);
  }
}

export default TaskActions;
