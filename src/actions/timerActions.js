import * as types from '../constants';

export const createTimer = (timer) => {
  timer.id = Math.random();
  timer.start = null;
  timer.stop = null;
  timer.duration = 0;
  timer.running = false;

  return {
    type: types.CREATE_TIMER,
    timer
  };
};

export const deleteTimer = (id) => {
  return {
    type: types.DELETE_TIMER,
    id
  };
};

export const startTimer = (id, time) => {
  return {
    type: types.START_TIMER,
    time,
    id
  };
};

export const stopTimer = (id, time) => {
  return {
    type: types.STOP_TIMER,
    time,
    id
  };
};
