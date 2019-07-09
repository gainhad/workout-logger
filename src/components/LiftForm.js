import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  currentWorkoutActions,
  getCurrentLift
} from '../redux/slices/currentWorkout';
import './LiftForm.scss';

const LiftForm = ({ liftIndex = undefined, closeModal }) => {
  const currrentLiftName = useSelector(state => getCurrentLift(state)).name;
  const [selectedLift, setSelectedLift] = useState(
    isNaN(liftIndex) ? 'SQUAT' : currrentLiftName 
  );
  const liftList = ['SQUAT', 'BENCH PRESS', 'DEADLIFT'];
  const dispatch = useDispatch();
  const submitLift = lift =>
    dispatch(currentWorkoutActions.addOrRenameLift(lift));

  function onSubmit(event) {
    event.preventDefault();
    submitLift({ liftIndex: liftIndex, name: selectedLift });
    closeModal();
  }

  return (
    <form id="new-lift" onSubmit={onSubmit}>
      {liftList.map(lift => {
        return (
          <label
            className={
              'lift-option' + (lift === selectedLift ? ' selected' : '')
            }
          >
            <input
              type="radio"
              value={lift}
              id={lift}
              checked={lift === selectedLift}
              onChange={() => setSelectedLift(lift)}
            />
            {lift}
          </label>
        );
      })}
      <input
        type="button"
        className="button-one cancel-button"
        value="CANCEL"
        onClick={closeModal}
      />
      <input type="submit" className="button-one" value={isNaN(liftIndex) ? 'ADD' : 'UPDATE'} />
    </form>
  );
};

export default LiftForm;
