import * as types from '../constants';
import initialState from '../initialState';

const timerReducer = (state = initialState.timers, action) => {
  let timers = null;
  let idx = -1;

  switch (action.type) {
    case types.LOAD_TIMERS:
      return action.timers;
    case types.CREATE_TIMER:
      timers = [...state, Object.assign({}, action.timer)];
      return timers;
    case types.START_TIMER:
    case types.STOP_TIMER:
      timers = [...state];
      idx = timers.findIndex(timer => timer._id === action.timer._id);
      timers.splice(idx, 1, Object.assign({}, action.timer));
      return timers;
    case types.DELETE_TIMER:
      timers = state.filter(timer => timer._id !== action.id);
      return timers;
    default:
      return state;
  }
};

export default timerReducer;
