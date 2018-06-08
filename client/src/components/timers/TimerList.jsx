import React from 'react';

const TimerList = (props) => {
  const { timers } = props;

  if (!timers.length) {
    return null;
  }

  const active = timers.some(timer => timer.running);

  const children = [];

  React.Children.forEach(props.children, (child, childIndex) => {
    if (childIndex === 0) {
      timers.forEach((timer, index) => {
        children.push(React.cloneElement(child, {
          active,
          timer,
          key: index,
          time: props.time,
          current: props.current,
          formatTime: props.formatTime,
          month: props.month,
          date: props.date,
          records: props.records,
          setTimer: props.setTimer,
          deleteTimer: props.deleteTimer
        }));
      });
    } else {
      children.push(React.cloneElement(child, {
        key: 'clear-records',
        clearRecords: props.clearRecords
      }));
    }
  });

  return (
    <section id="timers" className="list-group">
      {children}
    </section>
  );
};

export default TimerList;
