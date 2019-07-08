import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addLift
} from '../redux/slices/currentWorkout';
import './NewLift.scss';

const NewLift = props => {
  const [selectedLift, setSelectedLift] = useState('SQUAT');
  const liftList = ['SQUAT', 'BENCH PRESS', 'DEADLIFT'];

  function onSubmit(event) {
    event.preventDefault();
    props.addLift({ name: selectedLift});
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

const mapDispatchToProps = {
  addLift
}

export default connect(
  null,
  mapDispatchToProps
)(NewLift);
