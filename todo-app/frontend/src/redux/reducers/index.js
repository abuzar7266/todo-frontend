import { combineReducers } from 'redux';
import taskReducer from './taskReducer'; // You'll create this file later

const rootReducer = combineReducers({
  taskReducer: taskReducer
});

export default rootReducer;