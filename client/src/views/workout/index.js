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
import Tippy from "../../components/tippy";
import ButtonOne from "../../components/ButtonOne";
import styles from "./workout.module.scss";

const Workout = props => {
  const dispatch = useDispatch();
  const [timesDisplayModalOpen, setTimesDisplayModalOpen] = useState(false);
  const [exitModalOpen, setExitModalOpen] = useState(false);
  const [finishModalOpen, setFinishModalOpen] = useState(false);
  const [tooltipsVisible, setTooltipsVisible] = useState(false);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  useEffect(() => {
    if (!workoutStarted) {
      dispatch(currentWorkoutActions.startWorkout({ timeStarted: Date.now() }));
      setWorkoutStarted(true);
    }
  }, [workoutStarted, dispatch]);

  useEffect(() => {
    if (tooltipsVisible) {
      const timeout = setTimeout(() => {
        setTooltipsVisible(false);
      }, 2000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [tooltipsVisible]);

  // TODO: Store current workout data in local storage

  return (
    <>
      <div id={styles.workoutScreen}>
        <ButtonOne
          type="button"
          id={styles.exitButton}
          className={styles.navButton}
          onClick={() => setExitModalOpen(true)}
        >
          EXIT
        </ButtonOne>
        <RestTimer />
        <ButtonOne
          type="button"
          onClick={() => setFinishModalOpen(true)}
          className={styles.navButton}
          id={styles.finishButton}
        >
          FINISH
        </ButtonOne>
        <LiftLog tooltipsVisible={tooltipsVisible} />
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
        <Tippy content="Show Help Tooltips" visible={tooltipsVisible}>
          <button
            type="button"
            className={styles.helpButton}
            onClick={() => setTooltipsVisible(!tooltipsVisible)}
          >
            ?
          </button>
        </Tippy>
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
