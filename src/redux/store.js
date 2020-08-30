import { createStore, compose, applyMiddleware } from 'redux';
import gameReducer from './reducers/gameReducer';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(gameReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;
