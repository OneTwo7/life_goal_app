import * as types from '../constants';

export const createGoal = (goal) => {
  goal.id = Math.random();
  goal.date = new Date();
  goal.completed = false;

  return {
    type: types.CREATE_GOAL,
    goal
  };
};

export const completeGoal = (id) => {
  const date = new Date();

  return {
    type: types.COMPLETE_GOAL,
    date,
    id
  };
};

export const deleteGoal = (id) => {
  return {
    type: types.DELETE_GOAL,
    id
  };
};

export const clearGoals = () => {
  return {
    type: types.CLEAR_GOALS
  };
};
