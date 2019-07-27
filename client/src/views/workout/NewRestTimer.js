import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { currentWorkoutActions } from "../../redux/slices/currentWorkout";
import styles from "./newRestTimer.module.scss";
import { prettyDisplayTime } from "../../utils/displayHelpers";
import ButtonOne from "../../components/ButtonOne";

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
    <div id={styles.newRestTimer}>
      <div id={styles.timer}>
        <div className={styles.timerDisplay}>
          <b>{prettyDisplayTime(totalSeconds)}</b>
        </div>
        <ButtonOne
          type="button"
          className={styles.timeChangeButton}
          id={styles.minus30}
          onClick={() => {
            if (totalSeconds >= 30) {
              setTotalSeconds(totalSeconds - 30);
            }
          }}
        >
          - 30 Sec
        </ButtonOne>
        <ButtonOne
          type="button"
          className={styles.timeChangeButton}
          id={styles.plus30}
          onClick={() => setTotalSeconds(totalSeconds + 30)}
        >
          + 30 Sec
        </ButtonOne>
      </div>
      <ButtonOne
        type="button"
        onClick={props.closeModal}
        className={styles.actionButton}
        id={styles.skipButton}
      >
        SKIP
      </ButtonOne>
      <ButtonOne
        type="button"
        onClick={startTimer}
        className={styles.actionButton}
      >
        START
      </ButtonOne>
    </div>
  );
};

export default NewRestTimer;
