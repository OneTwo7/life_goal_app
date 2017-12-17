import * as types from './constants';
import * as storage from './localStorage';

const goalReducer = (state = [], action) => {
  let goals = storage.get('goals');

  switch (action.type) {
    case types.CREATE_GOAL:
      goals = [...goals, Object.assign({}, action.goal)];
      storage.set('goals', goals);
      return goals;
    case types.COMPLETE_GOAL:
      goals = goals.map(goal => {
        if (goal.id === action.id) {
          goal.completed = true;
          goal.date = action.date;
        }
        return goal;
      });
      storage.set('goals', goals);
      return goals;
    case types.DELETE_GOAL:
      goals = goals.filter(goal => goal.id !== action.id);
      storage.set('goals', goals);
      return goals;
    case types.CLEAR_GOALS:
      storage.remove('goals');
      return [];
    default:
      return goals;
  }
};

export default goalReducer;
