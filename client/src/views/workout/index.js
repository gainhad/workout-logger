import React, { useState, useEffect } from "react";
import LiftLog from "./LiftLog";
import Modal from "../../components/Modal";
import E1rmDisplay from "./E1rmDisplay";
import RestTimer from "./RestTimer";
import TimesDisplay from "./TimesDisplay";
import ExitMenu from "./ExitMenu";
import FinishWorkoutMenu from "./FinishWorkoutMenu.js";
import { useDispatch } from "react-redux";
import { currentWorkoutActions } from "../../redux/slices/currentWorkout";
import ButtonOne from "../../components/ButtonOne";
import styles from "./workout.module.scss";

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
      <div id={styles.workoutScreen}>
        <ButtonOne
          type="button"
          id={styles.exitButton}
          onClick={() => setExitModalOpen(true)}
        >
          EXIT
        </ButtonOne>
        <RestTimer />
        <ButtonOne
          type="button"
          onClick={() => setFinishModalOpen(true)}
          id={styles.finishButton}
        >
          FINISH
        </ButtonOne>
        <LiftLog />
        <E1rmDisplay />
        <button
          type="button"
          onClick={() => setTimesDisplayModalOpen(true)}
          className="upper-right button-underline"
          id={styles.timesToggle}
        >
          TIMES
        </button>
        <button
          type="button"
          id={styles.liftHistoryButton}
          className="arrow-button"
        >
          Lift History
        </button>
      </div>
      <Modal
        isOpen={timesDisplayModalOpen}
        onClose={() => setTimesDisplayModalOpen(false)}
        id={styles.timesModal}
      >
        <TimesDisplay />
      </Modal>
      <Modal
        isOpen={exitModalOpen}
        onClose={() => setExitModalOpen(false)}
        id={styles.exitModal}
      >
        <ExitMenu />
      </Modal>
      <Modal
        isOpen={finishModalOpen}
        onClose={() => setFinishModalOpen(false)}
        id={styles.finishWorkoutModal}
      >
        <FinishWorkoutMenu />
      </Modal>
    </>
  );
};

export default Workout;