import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { currentWorkoutActions } from '../redux/slices/currentWorkout';
import './NewRestTimer.scss';
import { prettyDisplayTime } from '../utils/displayHelpers';

const NewRestTimer = props => {
  const [totalSeconds, setTotalSeconds] = useState(180);

  const dispatch = useDispatch();
  const startRestTimer = duration =>
    dispatch(currentWorkoutActions.startRestTimer(duration));

  function startTimer() {
    startRestTimer(totalSeconds);
    props.closeModal();
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
        onClick={props.closeModal}
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
