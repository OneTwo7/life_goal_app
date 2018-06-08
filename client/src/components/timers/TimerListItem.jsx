import React from 'react';

const TimerListItem = (props) => {
  const { current, timer } = props;

  const children = React.Children.map(props.children, (child, idx) => {
    if (idx === 0) {
      return React.cloneElement(child, {
        current,
        timer,
        time: props.time,
        formatTime: props.formatTime,
        month: props.month,
        date: props.date,
        records: props.records
      });
    } else {
      return React.cloneElement(child, {
        current,
        running: timer.running,
        active: props.active,
        setTimer: props.setTimer,
        deleteTimer: props.deleteTimer
      });
    }
  })

  return (
    <div id={timer._id} className="timer list-group-item">
      {children}
    </div>
  );
};

export default TimerListItem;
