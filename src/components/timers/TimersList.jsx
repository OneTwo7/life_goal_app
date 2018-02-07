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
                    records[month][date][timer.id].duration +
                    Date.parse(time) - Date.parse(timer.start)
                  )
                }
              </div>
            }
            {
              !timer.running && (
                records[month] &&
                records[month][date] &&
                records[month][date][timer.id] ?
                <div>
                  {formatTime(records[month][date][timer.id].duration)}
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
