import React from 'react';
import moment from 'moment';

const GoalListItem = ({ goal, completed, completeGoal, deleteGoal }) => (
  <li id={goal._id} className="list-group-item">
    <div className="goal-description">
      <div>{goal.text}</div>
      <div>{moment(goal.date).format('MMM Do YYYY')}</div>
    </div>
    {
      !completed &&
      <button
        onClick={completeGoal}
        className="btn btn-success complete-btn"
      >
        Complete
      </button>
    }
    <button
      onClick={deleteGoal}
      className="delete-btn"
    >
      &#x2715;
    </button>
  </li>
);

export default GoalListItem;
