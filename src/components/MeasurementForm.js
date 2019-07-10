import React, { useState } from 'react';
import './MeasurementForm.scss';

const MeasurementForm = props => {
  const [measurement, setMeasurement] = useState(undefined);
  function onSubmit(event) {
    event.preventDefault();
    props.closeModal();
  }

  return (
    <form id="measurement-form" className="form-one" onSubmit={onSubmit}>
      <label for="measurement-input" className="measurement-form-label">{props.type}:</label>
      <input
        id="measurement-input"
        type="number"
        required={true}
        value={measurement}
        onChange={event => setMeasurement(event.target.value)}
        autoFocus
      />
      <button type="button" className="form-button measurement-form-button" onClick={props.closeModal}>
        CANCEL
      </button>
      <button type="submit" className="form-button measurement-form-button">
        ENTER
      </button>
    </form>
  );
};

export default MeasurementForm;
