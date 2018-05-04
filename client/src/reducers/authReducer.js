import { FETCH_USER } from '../constants';
import initialState from '../initialState';

export default (state = initialState.auth, action) => {
  if (action.type === FETCH_USER) {
    return action.user || {};
  } else {
    return state;
  }
};
