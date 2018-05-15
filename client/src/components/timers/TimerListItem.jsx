import React from 'react';
import ProgressBar from '../common/ProgressBar';

const renderProgress = (running, current, time) => {
  if (running && current) {
    return (
      <ProgressBar
        className="timer-progress"
        value={Math.floor(time / 1000 % 60) % 11 * 10}
      />
    );
  } else {
    return (<div className="timer-progress" />);
  }
};

const renderTime = (timer, current, formatTime, month, date, time, records) => {
  const { _id, running, start } = timer;
  let timerTime = 0;

  if (records[_id]) {
    timerTime = records[_id].duration;
  }

  if (running && current) {
    timerTime += Date.parse(time) - Date.parse(start);
  }

  return (<div className="timer-time">{formatTime(timerTime)}</div>);
};

const renderSet = (current, active, timer, setTimer) => {
  if (current) {
    if (active) {
      if (timer.running) {
        return (
          <button onClick={setTimer} className="btn btn-primary">
            Stop
          </button>
        );
      } else {
        return (<div className="timer-set" />);
      }
    } else {
      return (
        <button onClick={setTimer} className="btn btn-primary">
          Start
        </button>
      );
    }
  } else {
    return (<div className="timer-set" />);
  }
};

export default (props) => {
  const { timer, current, time, month, date, records, formatTime } = props;

  return (
    <div id={timer._id} className="timer list-group-item">
      <div className="timer-info">
        <div className="timer-title">{timer.text}</div>
        {renderProgress(timer.running, current, time)}
        {renderTime(timer, current, formatTime, month, date, time, records)}
      </div>
      {renderSet(current, props.active, timer, props.setTimer)}
      <button onClick={props.deleteTimer} className="delete-btn">
        &#x2715;
      </button>
    </div>
  );
};
