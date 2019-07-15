import React from "react";
import { currentWorkoutActions } from "../redux/slices/currentWorkout.js";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./FinishWorkoutMenu.scss";

const FinishWorkoutMenu = props => {
  const dispatch = useDispatch();
  function finishWorkout() {
    dispatch(currentWorkoutActions.finishWorkout());
    props.closeModal();
  }

  return (
    <div id="finish-workout-menu">
      <p className="modal-message">
        Are you sure you want to finish the workout?
      </p>
      <button
        onClick={props.closeModal}
        className="button-one"
        id="cancel-finish-button"
      >
        CANCEL
      </button>
      <Link to="/">
        <button
          className="button-one"
          onClick={finishWorkout}
          id="finish-workout-button"
        >
          FINISH
        </button>
      </Link>
    </div>
  );
};

export default FinishWorkoutMenu;
