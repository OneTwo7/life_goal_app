import React from 'react';

const GoalsList = ({ goals, completed, id, header, renderGoals }) => (
  <div id={id}>
    <h2>{header}</h2>
    <ul className="list-group">
      {renderGoals(goals, completed)}
    </ul>
  </div>
);

export default GoalsList;
