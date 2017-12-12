import React from 'react';

const GoalForm = ({ text, onChange, onClick }) => (
  <form className="form-inline">
    <input
      type="text"
      value={text}
      onChange={onChange}
      name="text"
      className="form-control"
    />
    <button
      type="button"
      onClick={onClick}
      className="btn btn-primary"
    >
      Add
    </button>
  </form>
);

export default GoalForm;
