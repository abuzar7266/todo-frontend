import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // You'll create this file later

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
