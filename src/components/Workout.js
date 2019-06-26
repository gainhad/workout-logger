import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LiftLog from './LiftLog';
import Modal from './Modal';
import Backdrop from './Backdrop';
import NewSet from './NewSet';
import './Workout.scss';

const Workout = props => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [newSetModal, setNewSetModal] = useState(false);
  const [timesModal, setTimesModal] = useState(false);

  function toggleSetModal() {
    setNewSetModal(!newSetModal);
    setIsBlurred(!isBlurred);
  }

  function toggleTimesModal() {
    setTimesModal(!timesModal);
    setIsBlurred(!isBlurred);
  }
  
  function addSet(newWeight, newReps, newRpe) {
    const newSet = {
      weight: newWeight,
      reps: newReps,
      rpe: newRpe
    }
    console.log(newSet);
  }

  let test = isBlurred ? 'blurred' : '';

  return (
    <React.Fragment>
      <div id="workout-screen" className={test}>
        <Link to="/" class="upper-left">
          <button type="button" class="arrow-button">
            &larr;
          </button>
        </Link>
        <button
          type="button"
          onClick={toggleTimesModal}
          class="upper-right button-underline"
        >
          TIMES
        </button>
        <LiftLog toggleModal={toggleSetModal} />
      </div>
      {newSetModal && (
        <Modal toggleButton={false} id="set-modal">
          <NewSet toggleModal={toggleSetModal} addSet={addSet}/>
        </Modal>
      )}
      {timesModal && (
        <Modal toggleButton={false} id="times-modal">
          <button
            type="button"
            onClick={toggleTimesModal}
            class="upper-right button-underline"
          >
            TIMES
          </button>
        </Modal>
      )}
      {(newSetModal || timesModal) && <Backdrop />}
    </React.Fragment>
  );
};

export default Workout;
