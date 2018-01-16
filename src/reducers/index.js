import { combineReducers } from 'redux';
import goals from './goalReducer';
import timers from './timerReducer';

const rootReducer = combineReducers({
  goals,
  timers
});

export default rootReducer;
