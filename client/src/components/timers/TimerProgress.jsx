import React from 'react';
import ProgressBar from '../common/ProgressBar';

const TimerProgress = ({ current, running, time }) => {
  let bar = null;

  if (current && running) {
    bar = <ProgressBar value={(Math.floor(time / 1000) % 10 + 1) * 10} />;
  }

  return (
    <div className="timer-progress">
      {bar}
    </div>
  );
};

export default TimerProgress;
