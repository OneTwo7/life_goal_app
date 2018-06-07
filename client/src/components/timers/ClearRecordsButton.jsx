import React from 'react';

const ClearRecordsButton = ({ clearRecords }) => (
  <div id="bottom-div">
    <button
      type="button"
      className="btn btn-danger btn-large"
      onClick={this.clearRecords}
    >
      Clear records
    </button>
  </div>
);

export default ClearRecordsButton;
