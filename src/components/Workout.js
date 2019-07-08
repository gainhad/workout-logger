import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LiftLog from './LiftLog';
import Modal from './Modal';
import Backdrop from './Backdrop';
import NewSet from './NewSet';
import E1rmDisplay from './E1rmDisplay';
import RestTimer from './RestTimer';
import useInterval from '../utils/useInterval';
import NewRestTimer from './NewRestTimer';
import NewLift from './NewLift';
import EditLift from './EditLift';
import soundFile from '../assets/audio/bell.wav';
import './Workout.scss';

const Workout = props => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [newSetModal, setNewSetModal] = useState(false);
  const [editLiftModal, setEditLiftModal] = useState(false);
  const [editSetModal, setEditSetModal] = useState({
    display: false,
    index: 0
  });
  const [newLiftModal, setNewLiftModal] = useState(false);
  const [timesModal, setTimesModal] = useState(false);
  const [restTimerModal, setRestTimerModal] = useState(false);
  const [timers, setTimers] = useState([
    {
      name: 'rest',
      decrement: true,
      started: false,
      finished: false,
      seconds: 0
    }
  ]);

  //update times every second
  useInterval(() => {
    setTimers(
      timers.map(timer => {
        if (timer.started) {
          if (timer.decrement && timer.seconds > 0) {
            return Object.assign(timer, { seconds: timer.seconds - 1 });
          } else if (timer.decrement) {
            return Object.assign(timer, { finished: true });
          } else if (!timer.decrement) {
            return Object.assign(timer, { seconds: timer.seconds + 1 });
          } else {
            return timer;
          }
        } else {
          return timer;
        }
      })
    );
  }, 1000);

  function startIndividualTimer(timerName, newSeconds) {
    setTimers(
      timers.map(timer => {
        if (timer.name === timerName) {
          return Object.assign(timer, {
            seconds: newSeconds,
            started: true,
            finished: false
          });
        } else {
          return timer;
        }
      })
    );
  }

  function closeSetModal() {
    setNewSetModal(false);
  }

  function toggleSetModal() {
    if (newSetModal) {
      setNewSetModal(false);
      setRestTimerModal(true);
    } else {
      setNewSetModal(true);
    }
  }

  function toggleTimesModal() {
    setTimesModal(!timesModal);
  }

  function toggleRestTimerModal() {
    setRestTimerModal(!restTimerModal);
  }

  function toggleNewLiftModal() {
    setNewLiftModal(!newLiftModal);
  }

  function toggleEditLiftNameModal() {
    setNewLiftModal(true);
  }

  function toggleEditLiftModal() {
    setEditLiftModal(!editLiftModal);
  }

  function addSet(newWeight, newReps, newRpe) {
    const newSet = {
      weight: newWeight,
      reps: newReps,
      rpe: newRpe
    };
  }

  const test = isBlurred ? 'blurred' : '';

  const restTimer = timers.find(timer => timer.name === 'rest');

  // Play sound when rest finishes
  useEffect(() => {
    if (restTimer.finished) {
      const sound = new Audio();
      sound.src = soundFile;
      sound.play();
    }
  }, [restTimer.finished]);

  useEffect(() => {
    if (
      newSetModal ||
      newLiftModal ||
      restTimerModal ||
      editLiftModal ||
      timesModal
    ) {
      setIsBlurred(true);
    } else {
      setIsBlurred(false);
    }
  }, [newSetModal, newLiftModal, restTimerModal, editLiftModal, timesModal]);

  return (
    <React.Fragment>
      <div id="workout-screen" className={test}>
        <Link to="/" className="upper-left">
          <button type="button" className="arrow-button">
            &larr;
          </button>
        </Link>
        {restTimer.started && !restTimer.finished && (
          <RestTimer secondsRemaining={restTimer.seconds} />
        )}
        {restTimer.finished && (
          <div className="rest-timer" id="rest-finished">
            <b>REST FINISHED!</b>
          </div>
        )}
        <button
          type="button"
          onClick={toggleTimesModal}
          className="upper-right button-underline"
          id="times-toggle"
        >
          TIMES
        </button>
        <LiftLog
          toggleSetModal={toggleSetModal}
          toggleNewLiftModal={toggleNewLiftModal}
          setEditSetModal={setEditSetModal}
          toggleEditLiftModal={toggleEditLiftModal}
        />
        <E1rmDisplay />
        <button type="button" id="lift-history-button" className="arrow-button">
          Lift History
        </button>
      </div>
      {newSetModal && (
        <Modal toggleButton={false} id="set-modal">
          <NewSet
            closeModal={closeSetModal}
            toggleModal={toggleSetModal}
          />
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
          {restTimer.started && (
            <RestTimer secondsRemaining={restTimer.seconds} />
          )}
        </Modal>
      )}
      {restTimerModal && (
        <Modal toggleButton={false} id="new-rest-timer-modal">
          <NewRestTimer
            toggleModal={toggleRestTimerModal}
            startTimer={startIndividualTimer}
          />
        </Modal>
      )}
      {newLiftModal && (
        <Modal toggleButton={false} id="new-lift-modal">
          <NewLift toggleModal={toggleNewLiftModal}/>
        </Modal>
      )}
      {editSetModal.display && (
        <Modal toggleButton={false} id="edit-lift-modal">
          editing: {editSetModal.index}
        </Modal>
      )}
      {editLiftModal && (
        <Modal toggleButton={false} id="edit-lift-modal">
          <EditLift
            toggleModal={toggleEditLiftModal}
            changeLiftName={toggleEditLiftNameModal}
          />
        </Modal>
      )}
      {isBlurred && <Backdrop />}
    </React.Fragment>
  );
};

export default Workout;
