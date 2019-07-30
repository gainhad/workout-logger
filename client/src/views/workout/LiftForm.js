import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  currentWorkoutActions,
  getCurrentLift
} from "../../redux/slices/currentWorkout";
import styles from "./liftForm.module.scss";
import ButtonOne from "../../components/ButtonOne";

const LiftForm = ({ liftIndex = undefined, closeModal }) => {
  const currrentLiftName = useSelector(state => getCurrentLift(state)).name;
  const [selectedLift, setSelectedLift] = useState(
    isNaN(liftIndex) ? "SQUAT" : currrentLiftName
  );
  const [madeSelection, setMadeSelection] = useState(false);
  const liftList = ["SQUAT", "BENCH PRESS", "OVERHEAD PRESS", "DEADLIFT"];
  const dispatch = useDispatch();
  const submitLift = lift =>
    dispatch(currentWorkoutActions.addOrRenameLift(lift));

  function onSubmit(event) {
    event.preventDefault();
    submitLift({ liftIndex: liftIndex, name: selectedLift });
    closeModal();
  }

  return (
    <form id={styles.newLift} onSubmit={onSubmit}>
      <div id={styles.liftOptions}>
        {liftList.map(lift => {
          return (
            <label
              className={
                styles.option +
                " " +
                (lift === selectedLift ? styles.selected : null)
              }
            >
              <input
                type="radio"
                className={styles.input}
                value={lift}
                id={lift}
                checked={lift === selectedLift}
                onChange={() => setSelectedLift(lift)}
              />
              {lift}
            </label>
          );
        })}
      </div>
      <ButtonOne
        type="button"
        className={styles.button}
        id={styles.cancelButton}
        onClick={closeModal}
      >
        CANCEL
      </ButtonOne>
      <ButtonOne type="submit" className={styles.button}>
        {isNaN(liftIndex) ? "ADD" : "UPDATE"}
      </ButtonOne>
    </form>
  );
};

export default LiftForm;
