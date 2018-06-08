import React from 'react';

const GoalWrapper = (props) => {
  const { goals, completeGoal, deleteGoal } = props;

  if (!goals.length) {
    return null;
  }

  const currentGoals = [];
  const completedGoals = [];
  goals.forEach(goal => {
    if (goal.completed) {
      completedGoals.push(goal);
    } else {
      currentGoals.push(goal);
    }
  });

  const elements = React.Children.map(props.children, (child, idx) => {
    if (idx === 0) {
      return [
        React.cloneElement(child, {
          goals: currentGoals,
          completed: false,
          id: 'goals-list',
          title: 'Current Goals',
          completeGoal,
          deleteGoal
        }),
        React.cloneElement(child, {
          goals: completedGoals,
          completed: true,
          id: 'completed-list',
          title: 'Completed',
          completeGoal,
          deleteGoal
        })
      ];
    } else {
      return React.cloneElement(child, {
        clearGoals: props.clearGoals
      });
    }
  });

  const children = Array.prototype.concat(...elements);

  return (
    <div>{children}</div>
  );
};

export default GoalWrapper;
