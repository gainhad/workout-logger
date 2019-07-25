import React from "react";
import { currentWorkoutActions } from "../../redux/slices/currentWorkout.js";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./finishWorkoutMenu.module.scss";
import ButtonOne from "../../components/ButtonOne";

const FinishWorkoutMenu = props => {
  const dispatch = useDispatch();
  function finishWorkout() {
    dispatch(currentWorkoutActions.finishWorkout());
    props.closeModal();
  }

  return (
    <div id={styles.finishWorkoutMenu}>
      <p className="modal-message">
        Are you sure you want to finish the workout?
      </p>
      <ButtonOne onClick={props.closeModal} id={styles.cancelButton}>
        CANCEL
      </ButtonOne>
      <Link to="/">
        <ButtonOne onClick={finishWorkout} id={styles.finishButton}>
          FINISH
        </ButtonOne>
      </Link>
    </div>
  );
};

export default FinishWorkoutMenu;
