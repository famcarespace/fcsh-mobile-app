import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers'

const initialState = {};
const middleware = [thunk];

const enhancer = compose(applyMiddleware(...middleware));
const store = createStore(reducers, initialState, enhancer);

export default store;