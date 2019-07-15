import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { measurementHistoryActions } from "../redux/slices/measurementHistory";
import "./MeasurementForm.scss";

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
    <form id="measurement-form" className="form-one" onSubmit={onSubmit}>
      <label htmlFor="measurement-input" className="measurement-form-label">
        {props.type}:
      </label>
      <input
        id="measurement-input"
        type="number"
        required={true}
        onChange={event => setMeasurement(Number(event.target.value))}
        autoFocus
      />
      <button
        type="button"
        className="form-button measurement-form-button"
        onClick={props.closeModal}
      >
        CANCEL
      </button>
      <button type="submit" className="form-button measurement-form-button">
        ENTER
      </button>
    </form>
  );
};

export default MeasurementForm;
