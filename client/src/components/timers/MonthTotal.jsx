import React from 'react';

const MonthTotal = ({ timers, formatTime, totals, wastedTime }) => {
  if (!timers.length) {
    return null;
  }

  return (
    <div id="month-total" className="card bg-light">
      <div className="card-header">Month's total</div>
      <div className="card-body">
        {
          timers.map(timer => (
            <div key={timer._id} className="timer-total">
              <div>{timer.text}</div>
              <div>{formatTime(totals[timer._id])}</div>
            </div>
          ))
        }
        <div key="wasted-time" className="timer-total">
          <div>Time Wasted</div>
          <div>{formatTime(wastedTime)}</div>
        </div>
      </div>
    </div>
  );
};

export default MonthTotal;
