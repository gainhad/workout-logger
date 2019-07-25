import React, { useState } from "react";
import { useSelector } from "react-redux";
import { prettyDisplayTime } from "../../utils/displayHelpers";
import { useInterval } from "../../utils/customHooks";
import "./RestTimerDisplay";

const RestTimerDisplay = props => {
  const timer = useSelector(state => state.currentWorkout.restTimer);
  const updateSecondsRemaining = timer =>
    timer.duration - (Date.now() - timer.timeStarted) / 1000;
  const [secondsRemaining, setSecondsRemaining] = useState(
    updateSecondsRemaining(timer)
  );

  // Update timer every second.
  useInterval(() => {
    setSecondsRemaining(updateSecondsRemaining(timer));
  }, 1000);

  if (secondsRemaining > 0) {
    return (
      <div className="timer rest-timer-display">
        REST COUNTDOWN: {prettyDisplayTime(secondsRemaining)}
      </div>
    );
  } else {
    return null;
  }
};

export default RestTimerDisplay;
