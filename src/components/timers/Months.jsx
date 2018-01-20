import React from 'react';

const Months = ({ months, selectedMonth, selectMonth }) => (
  <section className="months">
    {
      months.map((month, idx) => (
        <button
          id={'month_' + idx}
          className={idx === selectedMonth ? 'month active' : 'month'}
          key={idx}
          type="button"
          onClick={selectMonth}
        >
          {month.name}
        </button>
      ))
    }
  </section>
);

export default Months;
