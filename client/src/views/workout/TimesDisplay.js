import React, { useState } from "react";
import { useSelector } from "react-redux";
import RestTimerDisplay from "./RestTimerDisplay";
import { prettyDisplayTime } from "../../utils/displayHelpers";
import { useInterval } from "../../utils/customHooks";
import "./TimesDisplay.scss";

const TimesDisplay = props => {
  const timeStarted = useSelector(state => state.currentWorkout.timeStarted);
  function totalSecondsUpdate(timeStarted) {
    return (Date.now() - timeStarted) / 1000;
  }
  const [totalSeconds, setTotalSeconds] = useState(
    totalSecondsUpdate(timeStarted)
  );
  useInterval(() => setTotalSeconds(totalSecondsUpdate(timeStarted)), 1000);

  return (
    <div id="times-display">
      <RestTimerDisplay />
      <div className="timer total-workout-time">
        TOTAL WORKOUT TIME: {prettyDisplayTime(totalSeconds)}
      </div>
      <button
        type="button"
        onClick={props.closeModal}
        className="button-underline times-title"
      >
        TIMES
      </button>
    </div>
  );
};

export default TimesDisplay;
