import React from 'react';
import moment from 'moment';

const DatePicker = ({ dateString, onDateChange }) => (
  <form id="date-picker-form">
    <div>{moment(dateString).format('MMMM Do')}</div>
    <div>
      <input
        value={dateString}
        id="date-picker"
        className="form-control"
        type="date"
        onChange={onDateChange}
      />
      </div>
  </form>
);

export default DatePicker;
