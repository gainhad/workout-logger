import React, { useEffect } from 'react';
import RestTimer from './RestTimer';
import './TimesDisplay.scss';

const TimesDisplay = props => {
  return (
    <>
      <button
        type="button"
        onClick={props.closeModal}
        className="upper-right button-underline"
      >
        TIMES
      </button>
      <div>Workout Timer: {props.workoutTimer}</div>
  </>
  );
}

export default TimesDisplay;
