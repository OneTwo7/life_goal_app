import React from 'react';

export default ({ timers, formatTime, month, totals }) => {
  if (timers.length === 0) {
    return (<div />);
  }

  return (
    <div id="month-total" className="card bg-light">
      <div className="card-header">Month's total</div>
      <div className="card-body">
        {
          timers.map(timer => (
            <div key={timer._id} className="timer-total">
              <div>{timer.text}</div>
              <div>
                {formatTime(totals[timer._id])}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};
