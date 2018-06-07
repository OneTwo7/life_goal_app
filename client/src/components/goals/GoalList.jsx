import React from 'react';

const GoalList = (props) => {
  const { goals } = props;

  if (!goals.length) {
    return null;
  }

  const goalItem = React.Children.only(props.children);

  const children = goals.map((goal, index) => (
    React.cloneElement(goalItem, {
      goal,
      completed: props.completed,
      completeGoal: props.completeGoal,
      deleteGoal: props.deleteGoal,
      key: index
    })
  ));

  return (
    <div id={props.id}>
      <h2>{props.title}</h2>
      <ul className="list-group">
        {children}
      </ul>
    </div>
  );
};

export default GoalList;
