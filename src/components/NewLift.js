import React, { useState } from 'react';
import './NewLift.scss';

const NewLift = props => {
  const [selectedLift, setSelectedLift] = useState('SQUAT');
  const liftList = ['SQUAT', 'BENCH PRESS', 'DEADLIFT'];

  function onSubmit(event) {
    event.preventDefault();
    props.addLift(selectedLift);
    props.closeModal();
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
        onClick={props.closeModal}
      />
      <input type="submit" className="button-one" value="ADD LIFT" />
    </form>
  );
};

export default NewLift;
