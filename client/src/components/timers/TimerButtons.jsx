import React from 'react';

const TimerButtons = ({ current, active, running, setTimer, deleteTimer }) => {
  let timerItem = null;
  let buttonText = '';

  if (current) {
    if (active) {
      if (running) {
        buttonText = 'Stop';
      }
    } else {
      buttonText = 'Start';
    }
  }

  if (buttonText) {
    timerItem = (
      <button onClick={setTimer} className="btn btn-primary">
        {buttonText}
      </button>
    );
  }

  return [
    <div key="timer-set" className="timer-set">
      {timerItem}
    </div>,
    <button key="timer-delete" onClick={deleteTimer} className="delete-btn">
      &#x2715;
    </button>
  ];
};

export default TimerButtons;
