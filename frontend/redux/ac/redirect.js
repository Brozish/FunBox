import { replace } from 'react-router-redux';

export function redirectHome() {
  return dispatch => {
    dispatch(replace('/'));
  }
}
