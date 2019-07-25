import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentLiftIndex,
  getSetsForCurrentLift,
  currentWorkoutActions
} from "../../redux/slices/currentWorkout";
import ButtonOne from "../../components/ButtonOne";
import styles from "./setForm.module.scss";

const SetForm = ({
  setIndex = undefined,
  closeForm,
  closeModal,
  onSetSubmit = null
}) => {
  const currentLiftIndex = useSelector(state => getCurrentLiftIndex(state));
  const dispatch = useDispatch();
  const submitSet = set => dispatch(currentWorkoutActions.addOrUpdateSet(set));
  const currentLiftSets = useSelector(state => getSetsForCurrentLift(state));
  const currentSet = isNaN(setIndex) ? null : currentLiftSets[setIndex];

  function onSubmit(event) {
    event.preventDefault();
    submitSet({
      liftIndex: currentLiftIndex,
      setIndex: setIndex,
      set: {
        weight: Number(event.target.weight.value),
        reps: Number(event.target.reps.value),
        rpe: Number(event.target.rpe.value)
      }
    });
    if (onSetSubmit) {
      onSetSubmit();
    } else {
      closeModal();
    }
  }

  return (
    <form onSubmit={onSubmit} id={styles.setForm}>
      <div className={styles.inputSection}>
        <label for="weight">WEIGHT:</label>
        <input
          name="weight"
          id="weight"
          type="number"
          required={true}
          defaultValue={currentSet ? currentSet.weight : null}
          autoFocus
        />
      </div>
      <div className={styles.inputSection}>
        <label for="reps">REPS:</label>
        <input
          name="reps"
          id="reps"
          type="number"
          required={true}
          defaultValue={currentSet ? currentSet.reps : null}
        />
      </div>
      <div className={styles.inputSection}>
        <label for="rpe">RPE:</label>
        <input
          name="rpe"
          id="rpe"
          type="number"
          required={true}
          defaultValue={currentSet ? currentSet.rpe : null}
        />
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
        ENTER
      </ButtonOne>
    </form>
  );
};

export default SetForm;
