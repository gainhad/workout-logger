import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { measurementHistoryActions } from "../../redux/slices/measurementHistory";
import styles from "./measurementForm.module.scss";
import ButtonOne from "../../components/ButtonOne";

const MeasurementForm = props => {
  const [measurement, setMeasurement] = useState(null);
  const dispatch = useDispatch();
  const unit = props.type === "weight" ? "pounds" : "inches";
  function onSubmit(event) {
    event.preventDefault();
    props.closeModal();
    dispatch(
      measurementHistoryActions.addOrUpdateMeasurement(
        undefined,
        props.type,
        unit,
        measurement
      )
    );
  }

  return (
    <form id={styles.measurementForm} className="form-one" onSubmit={onSubmit}>
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
};

export default MeasurementForm;
