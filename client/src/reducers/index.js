import { combineReducers } from 'redux';
import goals from './goalReducer';
import timers from './timerReducer';
import records from './recordReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  goals,
  timers,
  records,
  auth
});

export default rootReducer;
