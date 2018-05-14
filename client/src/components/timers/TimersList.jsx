import React from 'react';
import TimerListItem from './TimerListItem';

export default (props) => {
  const active = props.timers.some(timer => timer.running);

  return (
    <section id="timers" className="list-group">
      {
        props.timers.map((timer, idx) => {
          const timerProps = Object.assign({}, props, { timer, active });
          return (<TimerListItem key={idx} {...timerProps} />);
        })
      }
    </section>
  );
};
