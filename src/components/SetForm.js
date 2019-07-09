import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentLiftIndex, currentWorkoutActions } from '../redux/slices/currentWorkout';
import './SetForm.scss';

const SetForm = ({ setIndex = null, closeForm, onSetSubmit}) => {
  const currentLiftIndex = useSelector(state => getCurrentLiftIndex(state)); 
  const dispatch = useDispatch();
  const submitSet = set => dispatch(currentWorkoutActions.addOrUpdateSet(set));

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
    onSetSubmit();
  }

  return (
    <form onSubmit={onSubmit} id="new-set">
      <input name="weight" type="number" required={true} placeholder="weight" />
      <input name="reps" type="number" required={true} placeholder="reps" />
      <input name="rpe" type="number" required={true} placeholder="rpe" />
      <input
        type="button"
        value="CANCEL"
        className="cancel-button"
        onClick={closeForm}
      />
      <input type="submit" value="ENTER" />
    </form>
  );
};

export default SetForm;
