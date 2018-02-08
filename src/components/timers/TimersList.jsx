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
            <div>{timer.text}</div>
            {
              timer.running &&
              <div>
                {
                  formatTime(
                    records[timer.id][month][date].duration +
                    Date.parse(time) - Date.parse(timer.start)
                  )
                }
              </div>
            }
            {
              !timer.running && (
                records[timer.id] &&
                records[timer.id][month] &&
                records[timer.id][month][date] ?
                <div>
                  {formatTime(records[timer.id][month][date].duration)}
                </div> :
                <div>{formatTime(0)}</div>
              )
            }
          </div>
          <div className="timer-btns">
            {
              currentMonth === month &&
              currentDate === date &&
              <button onClick={setTimer} className="btn btn-primary">
                {timer.running ? 'Stop' : 'Start'}
              </button>
            }
            <button onClick={deleteTimer} className="btn btn-danger">
              delete
            </button>
          </div>
        </div>
      ))
    }
  </section>
);

export default TimersList;
