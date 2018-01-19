import { combineReducers } from 'redux';
import goals from './goalReducer';
import timers from './timerReducer';
import records from './recordReducer';

const rootReducer = combineReducers({
  goals,
  timers,
  records
});

export default rootReducer;
