import React from 'react';

const Timer = ({ timer, current, formatTime, month, date, time, records }) => {
  const { _id, running, start } = timer;
  let timerTime = 0;

  const record = records.find(record => (
    record.timer === _id && record.month === month && record.date === date
  ));

  if (record) {
    timerTime = record.duration;
  }

  if (running && current) {
    timerTime += Date.parse(time) - Date.parse(start);
  }

  return (
    <div className="timer-time">{formatTime(timerTime)}</div>
  );
};

export default Timer;
