import React from 'react';

const MonthTotal = ({ timers, formatTime, month, totals }) => (
  <div id="month-total" className="card bg-light">
    <div className="card-header">Month's total</div>
    <div className="card-body">
      {
        timers.map(timer => (
          <div key={timer.id} className="timer-total">
            <div>{timer.text}</div>
            <div>
              {formatTime(totals[timer.id][month])}
            </div>
          </div>
        ))
      }
    </div>
  </div>
);

export default MonthTotal;
