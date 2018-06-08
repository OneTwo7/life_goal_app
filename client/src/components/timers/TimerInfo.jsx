import React from 'react';

const TimerInfo = (props) => {
  const { timer, current, time } = props;

  const children = React.Children.map(props.children, (child, idx) => {
    if (idx === 0) {
      return React.cloneElement(child, {
        current,
        time,
        running: props.timer.running
      });
    } else {
      return React.cloneElement(child, {
        timer,
        current,
        time,
        formatTime: props.formatTime,
        month: props.month,
        date: props.date,
        records: props.records
      });
    }
  });

  return (
    <div className="timer-info">
      <div className="timer-title">{timer.text}</div>
      {children}
    </div>
  );
};

export default TimerInfo;
