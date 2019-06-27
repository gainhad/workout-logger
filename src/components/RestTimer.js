import React from 'react';
import './RestTimer.scss';

const RestTimer = props => {
  return (
    <div className="rest-timer">
        REST COUNTDOWN: {props.secondsRemaining}
    </div>
  );
}

export default RestTimer;
