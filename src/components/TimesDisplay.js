import React from 'react';
import RestTimerDisplay from './RestTimerDisplay';
import './TimesDisplay.scss';

const TimesDisplay = props => {
  return (
    <div id="times-display">
      <button
        type="button"
        onClick={props.closeModal}
        className="upper-right button-underline"
      >
        TIMES
      </button>
      <RestTimerDisplay />
    </div>
  );
};

export default TimesDisplay;
