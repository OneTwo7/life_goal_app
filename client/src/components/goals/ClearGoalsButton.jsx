import React from 'react';

const ClearGoalsButton = ({ clearGoals }) => (
  <div id="bottom-div">
    <button
      className="btn btn-danger btn-large"
      onClick={clearGoals}
    >
      Clear Goals
    </button>
  </div>
);

export default ClearGoalsButton;
