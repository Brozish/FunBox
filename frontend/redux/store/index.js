import { createStore, applyMiddleware } from 'redux';
import reducer from '../reducers';
import logger from '../middlewares/logger';
import { routerMiddleware } from 'react-router-redux';
import history from '../../history';
import thunk from 'redux-thunk';

export const store = createStore(reducer, {}, applyMiddleware(
  thunk, routerMiddleware(history), logger
));
