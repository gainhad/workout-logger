import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { measurementHistoryActions } from "../../redux/slices/measurementHistory";
import styles from "./measurementForm.module.scss";
import ButtonOne from "../../components/ButtonOne";
import Loader from "../../components/Loader";

const MeasurementForm = props => {
  const [measurement, setMeasurement] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const inProgress = useSelector(
    state => state.measurementHistory.addingInProgress
  );
  const success = useSelector(state => state.measurementHistory.addingSuccess);
  const error = useSelector(state => state.measurementHistory.addingError);
  const unit = props.type === "weight" ? "pounds" : "inches";

  useEffect(() => {
    if (inProgress) {
      setShowLoader(true);
    }
  }, [inProgress]);

  useEffect(() => {
    if (success || error) {
      const loaderTimeout = setTimeout(() => {
        setShowLoader(false);
      }, 900);
      const timeout = setTimeout(
        () => {
          props.closeModal();
          dispatch(measurementHistoryActions.resetAdding());
        },
        error ? 3000 : 2000
      );
      return () => {
        clearTimeout(loaderTimeout);
        clearTimeout(timeout);
      };
    }
  }, [success, error, props, dispatch]);

  function onSubmit(event) {
    event.preventDefault();
    dispatch(
      measurementHistoryActions.addOrUpdateMeasurement(
        undefined,
        props.type,
        unit,
        measurement
      )
    );
  }
  if (showLoader) {
    return (
      <div id={styles.statusDisplay}>
        <Loader />
      </div>
    );
  } else if (success) {
    return (
      <div id={styles.statusDisplay}>
        <h2>Success!</h2>
      </div>
    );
  } else if (error) {
    return (
      <div id={styles.statusDisplay}>
        <h2>Error. Please try again. Sorry :(</h2>
      </div>
    );
  } else {
    return (
      <form
        id={styles.measurementForm}
        className="form-one"
        onSubmit={onSubmit}
      >
        <label
          htmlFor={styles.measurementInput}
          className={styles.measurementFormLabel}
        >
          {props.type}:
        </label>
        <input
          id={styles.measurementInput}
          type="number"
          required={true}
          onChange={event => setMeasurement(Number(event.target.value))}
          autoFocus
        />
        <ButtonOne
          type="button"
          className={styles.button}
          onClick={props.closeModal}
        >
          CANCEL
        </ButtonOne>
        <ButtonOne type="submit" className={styles.button}>
          ENTER
        </ButtonOne>
      </form>
    );
  }
};

export default MeasurementForm;
