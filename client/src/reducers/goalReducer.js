import * as types from '../constants';
import initialState from '../initialState';

const goalReducer = (state = initialState.goals, action) => {
  let goals = null;
  let idx = -1;

  switch (action.type) {
    case types.LOAD_GOALS:
      return action.goals;
    case types.CREATE_GOAL:
      goals = [...state, Object.assign({}, action.goal)];
      return goals;
    case types.COMPLETE_GOAL:
      goals = [...state];
      idx = goals.findIndex(goal => goal._id === action.goal._id);
      goals.splice(idx, 1, Object.assign({}, action.goal));
      return goals;
    case types.DELETE_GOAL:
      goals = state.filter(goal => goal._id !== action.id);
      return goals;
    case types.CLEAR_GOALS:
      return [];
    default:
      return state;
  }
};

export default goalReducer;
