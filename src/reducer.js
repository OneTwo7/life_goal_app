import * as types from './constants';
import { bake_cookie, read_cookie } from 'sfcookies';

const goalReducer = (state = [], action) => {
  let goals = read_cookie('goals');

  switch (action.type) {
    case types.CREATE_GOAL:
      goals = [...goals, Object.assign({}, action.goal)];
      bake_cookie('goals', goals);
      return goals;
    case types.COMPLETE_GOAL:
      goals = goals.map(goal => {
        if (goal.id === action.id) {
          goal.completed = true;
          goal.date = action.date;
        }
        return goal;
      });
      bake_cookie('goals', goals);
      return goals;
    case types.DELETE_GOAL:
      goals = goals.filter(goal => goal.id !== action.id);
      bake_cookie('goals', goals);
      return goals;
    default:
      return goals;
  }
};

export default goalReducer;
