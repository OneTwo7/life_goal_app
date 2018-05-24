import React from 'react';

export default ({ className, value }) => (
  <div className={'progress ' + className}>
    <div
      className="progress-bar progress-bar-striped progress-bar-animated"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
      style={{ width: value + '%' }}>
    </div>
  </div>
);
