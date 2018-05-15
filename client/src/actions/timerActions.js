import axios from 'axios';
import * as types from '../constants';

export const loadTimers = () => (async dispatch => {
  const res = await axios.get('/api/timers');
  dispatch({
    type: types.LOAD_TIMERS,
    timers: res.data
  });
});

export const createTimer = (timer) => (async dispatch => {
  const res = await axios.post('/api/timers', timer);
  dispatch({
    type: types.CREATE_TIMER,
    timer: res.data
  });
});

export const startTimer = (id) => (async dispatch => {
  const res = await axios.put(`/api/timers/${id}`);
  dispatch({
    type: types.START_TIMER,
    timer: res.data
  });
});

export const stopTimer = (id, start) => (async dispatch => {
  const res = await axios.put(`/api/timers/${id}`, { start });
  dispatch({
    type: types.STOP_TIMER,
    timer: res.data
  });
});

export const deleteTimer = (id) => (async dispatch => {
  await axios.delete(`/api/timers/${id}`);
  dispatch({
    type: types.DELETE_TIMER,
    id
  });
});
