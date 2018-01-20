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
  <section id="timers">
    {
      timers.map(timer => (
        <div key={timer.id} id={timer.id} className="timer">
          <div className="timer-info">
            <span>{timer.text}</span>
            {
              timer.running &&
              <span>
                {
                  formatTime(
                    records[month][date][timer.id].duration +
                    Date.parse(time) - Date.parse(timer.start)
                  )
                }
              </span>
            }
            {
              !timer.running && (
                records[month] &&
                records[month][date] &&
                records[month][date][timer.id] ?
                <span>
                  {formatTime(records[month][date][timer.id].duration)}
                </span> :
                <span>{formatTime(0)}</span>
              )
            }
          </div>
          <div className="timer-btns">
            {
              currentMonth === month &&
              currentDate === date &&
              <button onClick={setTimer} className="btn">
                {timer.running ? 'Stop' : 'Start'}
              </button>
            }
            <button onClick={deleteTimer} className="btn">
              delete
            </button>
          </div>
        </div>
      ))
    }
  </section>
);

export default TimersList;
