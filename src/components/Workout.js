import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LiftLog from './LiftLog';
import Modal from './Modal';
import E1rmDisplay from './E1rmDisplay';
import RestTimer from './RestTimer';
import TimesDisplay from './TimesDisplay';
import { useDispatch } from 'react-redux';
import { currentWorkoutActions } from '../redux/slices/currentWorkout';
import './Workout.scss';

const Workout = props => {
  const dispatch = useDispatch();
  const [timesDisplayModalOpen, setTimesDisplayModalOpen] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  useEffect(() => {
    if (!workoutStarted) {
      dispatch(currentWorkoutActions.addTimeStarted(Date.now()));
      setWorkoutStarted(true);
    }
  })

  return (
    <div id="workout-screen">
      <Link to="/" className="upper-left">
        <button type="button" className="arrow-button">
          &larr;
        </button>
      </Link>
      <RestTimer />
      <button
        type="button"
        onClick={() => setTimesDisplayModalOpen(true)}
        className="upper-right button-underline"
        id="times-toggle"
      >
        TIMES
      </button>
      <LiftLog />
      <E1rmDisplay />
      <button type="button" id="lift-history-button" className="arrow-button">
        Lift History
      </button>
      <Modal
        isOpen={timesDisplayModalOpen}
        onClose={() => setTimesDisplayModalOpen(false)}
        id="times-modal"
      >
        <TimesDisplay />
      </Modal>
    </div>
  );
};

export default Workout;
