import * as types from '../constants';
import * as storage from '../localStorage';

const timerReducer = (state = [], action) => {
  let timers = null;
  state = storage.get('timers');

  switch (action.type) {
    case types.CREATE_TIMER:
      timers = [...state, Object.assign({}, action.timer)];
      storage.set('timers', timers);
      return timers;
    case types.START_TIMER:
      timers = state.map(timer => {
        if (timer.id === action.id) {
          timer.start = action.time;
          timer.running = true;
        }
        return timer;
      });
      storage.set('timers', timers);
      return timers;
    case types.STOP_TIMER:
      timers = state.map(timer => {
        if (timer.id === action.id) {
          timer.stop = action.time;
          timer.duration += Date.parse(timer.stop) - Date.parse(timer.start);
          timer.running = false;
        }
        return timer;
      });
      storage.set('timers', timers);
      return timers;
    case types.DELETE_TIMER:
      timers = state.filter(timer => timer.id !== action.id);
      storage.set('timers', timers);
      return timers;
    default:
      return state;
  }
};

export default timerReducer;
