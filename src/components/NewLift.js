import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../redux/slices/currentWorkout';
import './NewLift.scss';

const NewLift = props => {
  const [selectedLift, setSelectedLift] = useState('SQUAT');
  const liftList = ['SQUAT', 'BENCH PRESS', 'DEADLIFT'];
  const dispatch = useDispatch();
  const addLift = lift => dispatch(actions.addLift(lift));

  function onSubmit(event) {
    event.preventDefault();
    addLift({ name: selectedLift });
    props.toggleModal();
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
        onClick={props.toggleModal}
      />
      <input type="submit" className="button-one" value="ADD LIFT" />
    </form>
  );
};

export default NewLift;
