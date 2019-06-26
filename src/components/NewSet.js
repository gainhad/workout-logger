import React, { useState } from 'react';
import './NewSet.scss';

const NewSet = props => {
  function onSubmit(event) {
    event.preventDefault();
    props.toggleModal();
    props.addSet(
      event.target.weight.value,
      event.target.reps.value,
      event.target.rpe.value
    );
  }

  return (
    <form onSubmit={onSubmit} id="new-set">
      <input
        name="weight"
        type="number"
        required={true}
        placeholder="weight"
      />
      <input
        name="reps"
        type="number"
        required={true}
        placeholder="reps"
      />
      <input
        name="rpe"
        type="number"
        required={true}
        placeholder="rpe"
      />
      <input
        type="button"
        value="2"
        value="CANCEL"
        onClick={props.toggleModal}
      />
      <input type="submit" value="ENTER" />
    </form>
  );
};

export default NewSet;
