import axios from 'axios';
import * as types from '../constants';

export const loadGoals = () => (async dispatch => {
  const res = await axios.get('/api/goals');
  dispatch({
    type: types.LOAD_GOALS,
    goals: res.data
  });
});

export const createGoal = (goal) => (async dispatch => {
  const res = await axios.post('/api/goals', goal);
  dispatch({
    type: types.CREATE_GOAL,
    goal: res.data
  });
});

export const completeGoal = (id) => (async dispatch => {
  const res = await axios.put(`/api/goals/${id}`);
  dispatch({
    type: types.COMPLETE_GOAL,
    goal: res.data
  });
});

export const deleteGoal = (id) => (async dispatch => {
  await axios.delete(`/api/goals/${id}`);
  dispatch({
    type: types.DELETE_GOAL,
    id
  });
});

export const clearGoals = () => (async dispatch => {
  await axios.delete('/api/goals');
  dispatch({
    type: types.CLEAR_GOALS
  });
});
