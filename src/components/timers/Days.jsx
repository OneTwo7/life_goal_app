import React from 'react';

const Days = ({ days, selectedDate, selectDate }) => (
  <section className="days">
    {
      days.map(day => (
        <button
          id={'day_' + day}
          key={day}
          className={day === selectedDate ? 'day active' : 'day'}
          type="button"
          onClick={selectDate}
        >
          {day}
        </button>
      ))
    }
  </section>
);

export default Days;
