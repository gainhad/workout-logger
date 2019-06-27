import React, { useState } from 'react';
import './NewRestTimer.scss';
import { prettyDisplayTime } from '../utils/displayHelpers';

const NewRestTimer = props => {
  const [totalSeconds, setTotalSeconds] = useState(180);

  function startTimer() {
    props.startTimer('rest', totalSeconds);
    props.toggleModal();
  }

  return (
    <div id="new-rest-timer">
      <div id="timer">
        <div className="timer-display">
          <b>{prettyDisplayTime(totalSeconds)}</b>
        </div>
        <button
          type="button"
          className="button-one time-change-button"
          id="minus-30"
          onClick={() => {
            if (totalSeconds >= 30) {
              setTotalSeconds(totalSeconds - 30);
            }
          }}
        >
          - 30 Sec
        </button>
        <button
          type="button"
          className="button-one time-change-button"
          id="plus-30"
          onClick={() => setTotalSeconds(totalSeconds + 30)}
        >
          + 30 Sec
        </button>
      </div>
      <button
        type="button"
        onClick={props.toggleModal}
        className="button-one action-button"
      >
        SKIP
      </button>
      <button
        type="button"
        onClick={startTimer}
        className="button-one action-button"
      >
        START
      </button>
    </div>
  );
};

export default NewRestTimer;
