import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LiftLog from './LiftLog';
import Modal from './Modal';
import Backdrop from './Backdrop';
import NewSet from './NewSet';
import E1rmDisplay from './E1rmDisplay';
import './Workout.scss';

const Workout = props => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [newSetModal, setNewSetModal] = useState(false);
  const [timesModal, setTimesModal] = useState(false);
  const [lifts, setLifts] = useState([
    {
      name: 'deadlift',
      sets: []
    },
    {
      name: 'squat',
      sets: [
        { weight: 230, reps: 5, rpe: 6 },
        { weight: 245, reps: 5, rpe: 7 },
        { weight: 255, reps: 5, rpe: 8 },
        { weight: 255, reps: 5, rpe: 8 }
      ]
    },
    {
      name: 'bench press',
      sets: [
        { weight: 100, reps: 7, rpe: 6 },
        { weight: 115, reps: 7, rpe: 7 },
        { weight: 125, reps: 7, rpe: 8 },
        { weight: 125, reps: 7, rpe: 8 },
        { weight: 125, reps: 7, rpe: 8 }
      ]
    }
  ]);
  const [currentLiftIndex, setCurrentLiftIndex] = useState(0);

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
    };
    setLifts(
      lifts.map((lift, index) => {
        if (index === currentLiftIndex) {
          lift.sets = [...lift.sets, newSet];
        }
        return lift;
      })
    );
  }

  const test = isBlurred ? 'blurred' : '';
  const maxSet = lifts[currentLiftIndex].sets.length
    ? lifts[currentLiftIndex].sets.reduce((a, b) => {
        return a.weight >= b.weight ? a : b;
      })
    : null;

  return (
    <React.Fragment>
      <div id="workout-screen" className={test}>
        <Link to="/" className="upper-left">
          <button type="button" className="arrow-button">
            &larr;
          </button>
        </Link>
        <button
          type="button"
          onClick={toggleTimesModal}
          className="upper-right button-underline"
        >
          TIMES
        </button>
        <LiftLog
          toggleModal={toggleSetModal}
          currentLiftIndex={currentLiftIndex}
          setCurrentLiftIndex={setCurrentLiftIndex}
          lifts={lifts}
        />
        {maxSet && maxSet.rpe >= 6.5 && <E1rmDisplay set={maxSet} />}
      </div>
      {newSetModal && (
        <Modal toggleButton={false} id="set-modal">
          <NewSet toggleModal={toggleSetModal} addSet={addSet} />
        </Modal>
      )}
      {timesModal && (
        <Modal toggleButton={false} id="times-modal">
          <button
            type="button"
            onClick={toggleTimesModal}
            className="upper-right button-underline"
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
