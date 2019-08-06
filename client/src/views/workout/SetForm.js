import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentLiftIndex,
  getSetsForCurrentLift,
  currentWorkoutActions
} from "../../redux/slices/currentWorkout";
import ButtonOne from "../../components/ButtonOne";
import styles from "./setForm.module.scss";
import Tippy from "../../components/validationTippy";

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
  const [weight, setWeight] = useState(currentSet ? currentSet.weight : "");
  const [reps, setReps] = useState(currentSet ? currentSet.reps : "");
  const [rpe, setRpe] = useState(currentSet ? currentSet.rpe : "");
  const [weightTooltipVisible, setWeightTooltipVisible] = useState(false);
  const [repsTooltipVisible, setRepsTooltipVisible] = useState(false);
  const [rpeTooltipVisible, setRpeTooltipVisible] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    const valid = validateAll(weight, reps, rpe);
    if (valid) {
      submitSet({
        liftIndex: currentLiftIndex,
        setIndex: setIndex,
        set: {
          weight: Number(weight),
          reps: Number(reps),
          rpe: Number(rpe)
        }
      });
      if (onSetSubmit) {
        onSetSubmit();
      } else {
        closeModal();
      }
    }
  }

  function validateWeight(value) {
    return value > 0;
  }

  function validateReps(value) {
    return value > 0;
  }

  function validateRpe(value) {
    return value <= 10 && value >= 6;
  }

  function validateAll(weight, reps, rpe) {
    return validateWeight(weight) && validateReps(reps) && validateRpe(rpe);
  }

  useEffect(() => {
    if (weight) {
      setWeightTooltipVisible(!validateWeight(weight));
    }
  }, [weight]);

  useEffect(() => {
    if (reps && !weightTooltipVisible) {
      setRepsTooltipVisible(!validateReps(reps));
    }
  }, [reps, weightTooltipVisible]);

  useEffect(() => {
    if (rpe && !weightTooltipVisible && !repsTooltipVisible) {
      setRpeTooltipVisible(!validateRpe(rpe));
    }
  }, [rpe, weightTooltipVisible, repsTooltipVisible]);

  return (
    <form onSubmit={onSubmit} id={styles.setForm}>
      <div className={styles.inputSection}>
        <label htmlFor="weight">WEIGHT:</label>
        <Tippy
          content={<p>Please enter a number greater than 0</p>}
          visible={weightTooltipVisible}
        >
          <input
            name="weight"
            id="weight"
            type="number"
            value={weight}
            onChange={e => setWeight(e.target.value)}
            autoFocus
          />
        </Tippy>
      </div>
      <div className={styles.inputSection}>
        <label htmlFor="reps">REPS:</label>
        <Tippy
          content={<p>Please enter a number greater than 0</p>}
          visible={repsTooltipVisible}
        >
          <input
            name="reps"
            id="reps"
            type="number"
            step="1"
            min="1"
            value={reps}
            onChange={e => setReps(e.target.value)}
          />
        </Tippy>
      </div>
      <div className={styles.inputSection}>
        <label htmlFor="rpe">RPE:</label>
        <Tippy
          content={
            <>
              <p>Please enter a number from 6 - 10</p>
              <a
                href="https://articles.reactivetrainingsystems.com/2017/12/05/how-to-use-rpe-in-your-training-correctly/"
                target="_blank"
                rel="noopener noreferrer"
              >
                RPE Help
              </a>
            </>
          }
          visible={rpeTooltipVisible}
        >
          <input
            name="rpe"
            id="rpe"
            type="number"
            step=".5"
            value={rpe}
            onChange={e => setRpe(e.target.value)}
          />
        </Tippy>
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
