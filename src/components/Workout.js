import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LiftLog from './LiftLog';
import Modal from './Modal';
import Backdrop from './Backdrop';
import E1rmDisplay from './E1rmDisplay';
import RestTimer from './RestTimer';
import TimesDisplay from './TimesDisplay';
import useInterval from '../utils/useInterval';
import soundFile from '../assets/audio/bell.wav';
import './Workout.scss';

const Workout = props => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [modal, setModal] = useState({ id: null, child: null });
  const [editSetModal, setEditSetModal] = useState(false);
  const [liftEditable, setLiftEditable] = useState(false);
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
    }, 
    {
      name: 'workout',
      decrement: false,
      started: true,
      finished: false,
      seconds: 0
    }
  ]);
  const restTimer = timers.find(timer => timer.name === 'rest');
  const workoutTimer = timers.find(timer => timer.name === 'workout');

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

  function closeModal() {
    setModal({ id: null, child: null });
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


  function openTimesDisplay() {
    setModal({
      id: 'times-modal',
      child: <TimesDisplay closeModal={closeModal} restTimerStarted={restTimer.started} restTimerSeconds={restTimer.seconds} workoutTimer={workoutTimer.seconds}/>
    });
  }

  const test = <div>{workoutTimer.Seconds}</div>;

  // Play sound when rest finishes
  useEffect(() => {
    if (restTimer.finished) {
      const sound = new Audio();
      sound.src = soundFile;
      sound.play();
    }
  }, [restTimer.finished]);

  useEffect(() => {
    modal.child ? setIsBlurred(true) : setIsBlurred(false);
  }, [modal.child]);

  const maxSet = lifts[currentLiftIndex].sets.length
    ? lifts[currentLiftIndex].sets.reduce((a, b) => {
        return a.weight >= b.weight ? a : b;
      })
    : null;

  return (
    <>
      <div id="workout-screen" className={isBlurred ? 'blurred' : ''}>
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
          onClick={openTimesDisplay}
          className="upper-right button-underline"
          id="times-toggle"
        >
          TIMES
        </button>
        <LiftLog
          liftEditable={liftEditable}
          setLiftEditable={setLiftEditable}
          setEditSetModal={setEditSetModal}
          currentLiftIndex={currentLiftIndex}
          setCurrentLiftIndex={setCurrentLiftIndex}
          lifts={lifts}
          setModal={setModal}
          closeModal={closeModal}
          addSet={addSet}
          startTimer={startIndividualTimer}
          addLift={addLift}
        />
        {maxSet && maxSet.rpe >= 6.5 && <E1rmDisplay set={maxSet} />}
        <button type="button" id="lift-history-button" className="arrow-button">
          Lift History
        </button>
      </div>
      <Modal id={modal.id} showModal={modal.child}>
        {modal.child}
      </Modal>
      {isBlurred && <Backdrop />}
    </>
  );
};

export default Workout;
