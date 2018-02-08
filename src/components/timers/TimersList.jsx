import React from 'react';
import ProgressBar from '../common/ProgressBar';

const TimersList = ({
  timers,
  records,
  month,
  date,
  time,
  currentMonth,
  currentDate,
  formatTime,
  setTimer,
  deleteTimer
}) => {
  const current = currentDate === date && currentMonth === month;

  return (
    <section id="timers" className="list-group">
      {
        timers.map(timer => (
          <div key={timer.id} id={timer.id} className="timer list-group-item">
            <div className="timer-info">
              <div className="timer-title">{timer.text}</div>
              {
                timer.running && current &&
                <ProgressBar
                  className="timer-progress"
                  value={Math.floor(time/1000%60)%11*10}
                />
              }
              {
                timer.running && current &&
                <div className="timer-time">
                  {
                    formatTime(
                      records[timer.id][month][date].duration +
                      Date.parse(time) - Date.parse(timer.start)
                    )
                  }
                </div>
              }
              {
                (!timer.running || !current) && <div className="timer-progress"></div>
              }
              {
                (!timer.running || !current) && (
                  records[timer.id] &&
                  records[timer.id][month] &&
                  records[timer.id][month][date] ?
                  <div className="timer-time">
                    {formatTime(records[timer.id][month][date].duration)}
                  </div> :
                  <div className="timer-time">{formatTime(0)}</div>
                )
              }
            </div>
            {
              current &&
              <button onClick={setTimer} className="btn btn-primary">
                {timer.running ? 'Stop' : 'Start'}
              </button>
            }
            <button onClick={deleteTimer} className="delete-btn">
              &#x2715;
            </button>
          </div>
        ))
      }
    </section>
  );
};

export default TimersList;
