import * as types from '../constants';
import * as storage from '../localStorage';
import initialState from '../initialState';

const timerReducer = (state = initialState.timers, action) => {
  let timers = null;
  state = storage.get('timers');

  switch (action.type) {
    case types.CREATE_TIMER:
      timers = [...state, Object.assign({}, action.timer)];
      storage.set('timers', timers);
      return timers;
    case types.START_TIMER:
      timers = state.map(timer => {
        if (timer._id === action.id) {
          timer.start = action.time;
          timer.running = true;
        }
        return timer;
      });
      storage.set('timers', timers);
      return timers;
    case types.STOP_TIMER:
      timers = state.map(timer => {
        if (timer._id === action.id) {
          timer.running = false;
        }
        return timer;
      });
      storage.set('timers', timers);
      return timers;
    case types.DELETE_TIMER:
      timers = state.filter(timer => timer._id !== action.id);
      storage.set('timers', timers);
      return timers;
    default:
      return state;
  }
};

export default timerReducer;
