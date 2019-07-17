import React, { useState, useEffect } from "react";
import LiftLog from "./LiftLog";
import Modal from "./Modal";
import E1rmDisplay from "./E1rmDisplay";
import RestTimer from "./RestTimer";
import TimesDisplay from "./TimesDisplay";
import ExitMenu from "./ExitMenu";
import FinishWorkoutMenu from "./FinishWorkoutMenu.js";
import { useDispatch } from "react-redux";
import { currentWorkoutActions } from "../redux/slices/currentWorkout";
import "./Workout.scss";

const Workout = props => {
  const dispatch = useDispatch();
  const [timesDisplayModalOpen, setTimesDisplayModalOpen] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [finishModalOpen, setFinishModalOpen] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  useEffect(() => {
    if (!workoutStarted) {
      dispatch(currentWorkoutActions.startWorkout({ timeStarted: Date.now() }));
      setWorkoutStarted(true);
    }
  }, [workoutStarted, dispatch]);

  /*
  window.addEventListener("beforeunload", function(e) {
    e.preventDefault();
    e.returnValue = "";
  });
*/

  return (
    <>
      <div id="workout-screen">
        <button
          type="button"
          className="button-one"
          id="exit-button"
          onClick={() => setExitModalOpen(true)}
        >
          EXIT
        </button>
        <RestTimer />
        <button
          type="button"
          onClick={() => setFinishModalOpen(true)}
          id="finish-button"
          className="button-one"
        >
          FINISH
        </button>
        <LiftLog />
        <E1rmDisplay />
        <button
          type="button"
          onClick={() => setTimesDisplayModalOpen(true)}
          className="upper-right button-underline"
          id="times-toggle"
        >
          TIMES
        </button>
        <button type="button" id="lift-history-button" className="arrow-button">
          Lift History
        </button>
      </div>
      <Modal
        isOpen={timesDisplayModalOpen}
        onClose={() => setTimesDisplayModalOpen(false)}
        id="times-modal"
      >
        <TimesDisplay />
      </Modal>
      <Modal
        isOpen={exitModalOpen}
        onClose={() => setExitModalOpen(false)}
        id="exit-modal"
      >
        <ExitMenu />
      </Modal>
      <Modal
        isOpen={finishModalOpen}
        onClose={() => setFinishModalOpen(false)}
        id="finish-workout-modal"
      >
        <FinishWorkoutMenu />
      </Modal>
    </>
  );
};

export default Workout;
