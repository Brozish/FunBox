import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as FormReducer } from 'redux-form';

export default combineReducers({
  router: routerReducer,
  form: FormReducer
});
