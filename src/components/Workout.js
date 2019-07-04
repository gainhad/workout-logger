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
  const [liftEditable, setLiftEditable] = useState(false);
  const [editLiftModal, setEditLiftModal] = useState(false);
  const [editSetModal, setEditSetModal] = useState({
    display: false,
    index: 0
  });
  const [newLiftModal, setNewLiftModal] = useState(false);
  const [timesModal, setTimesModal] = useState(false);
  const [restTimerModal, setRestTimerModal] = useState(false);
  const [lifts, setLifts] = useState([
    {
      name: 'deadlift',
      sets: [
        { weight: 230, reps: 5, rpe: 6 },
        { weight: 245, reps: 5, rpe: 7 },
        { weight: 255, reps: 5, rpe: 8 },
        { weight: 255, reps: 5, rpe: 8 }
      ]
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

    setLifts(
      lifts.map((lift, index) => {
        if (index === currentLiftIndex) {
          lift.sets = [...lift.sets, newSet];
        }
        return lift;
      })
    );
  }

  function addLift(newLift) {
    setLifts([{ name: newLift, sets: [] }, ...lifts]);
  }

  function updateLift(index, newLift) {
    let updatedLifts = [...lifts];
    updatedLifts[index].name = newLift;
    setLifts(updatedLifts);
  }

  const test = isBlurred ? 'blurred' : '';
  const maxSet = lifts[currentLiftIndex].sets.length
    ? lifts[currentLiftIndex].sets.reduce((a, b) => {
        return a.weight >= b.weight ? a : b;
      })
    : null;

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
          currentLiftIndex={currentLiftIndex}
          setCurrentLiftIndex={setCurrentLiftIndex}
          lifts={lifts}
          liftEditable={liftEditable}
          setLiftEditable={setLiftEditable}
          setEditSetModal={setEditSetModal}
          toggleEditLiftModal={toggleEditLiftModal}
        />
        {maxSet && maxSet.rpe >= 6.5 && <E1rmDisplay set={maxSet} />}
        <button type="button" id="lift-history-button" className="arrow-button">
          Lift History
        </button>
      </div>
      {newSetModal && (
        <Modal toggleButton={false} id="set-modal">
          <NewSet
            closeModal={closeSetModal}
            toggleModal={toggleSetModal}
            addSet={addSet}
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
          <NewLift toggleModal={toggleNewLiftModal} addLift={addLift} />
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
            lift={lifts[currentLiftIndex]}
            setLifts={setLifts}
          />
        </Modal>
      )}
      {isBlurred && <Backdrop />}
    </React.Fragment>
  );
};

export default Workout;
