import React from 'react';

const renderContent = (auth) => {
  if (auth && !auth._id) {
    return (
      <p id="intro">
        This app allows you to organize your life by setting and completing
        goals, creating custom timers and recording your progress.
      </p>
    );
  } else {
    return;
  }
};

export default ({ auth }) => (
  <div className="row">
    <div className="col-md-6 offset-md-3">
      {renderContent(auth)}
    </div>
  </div>
);
