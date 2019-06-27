import React from 'react';
import './RestTimer.scss';
import { prettyDisplayTime } from '../utils/displayHelpers';

const RestTimer = props => {
  return (
    <div className="rest-timer">
        REST COUNTDOWN: {prettyDisplayTime(props.secondsRemaining)}
    </div>
  );
}

export default RestTimer;
