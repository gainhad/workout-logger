import React from "react";
import {
  currentWorkoutActions,
  areLiftsWithoutSets
} from "../../redux/slices/currentWorkout.js";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./finishWorkoutMenu.module.scss";
import ButtonOne from "../../components/ButtonOne";

const FinishWorkoutMenu = props => {
  const dispatch = useDispatch();
  const liftsWithoutSets = useSelector(state => areLiftsWithoutSets(state));
  function finishWorkout() {
    dispatch(currentWorkoutActions.finishWorkout());
    props.closeModal();
  }

  return (
    <div id={styles.finishWorkoutMenu}>
      <div className="modal-message">
        <p>
          Are you sure you want to finish the workout?
          {liftsWithoutSets ? (
            <b>
              {" "}
              You have at least one lift without sets that will not be saved.
            </b>
          ) : null}
        </p>
      </div>
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
