import React from 'react';

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
}) => (
  <section id="timers" className="list-group">
    {
      timers.map(timer => (
        <div key={timer.id} id={timer.id} className="timer list-group-item">
          <div className="timer-info">
            <div className="timer-title">{timer.text}</div>
            {
              timer.running &&
              <div className="progress timer-progress">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuenow={time % 10000}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: (Math.floor(time/1000%60)%11*10) + '%' }}>
                </div>
              </div>
            }
            {
              timer.running &&
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
              !timer.running && <div className="timer-progress"></div>
            }
            {
              !timer.running && (
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
            currentMonth === month &&
            currentDate === date &&
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

export default TimersList;
