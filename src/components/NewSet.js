import React from 'react';
import './NewSet.scss';

const NewSet = props => {
  function onSubmit(event) {
    event.preventDefault();
    props.toggleModal();
    props.addSet(
      Number(event.target.weight.value),
      Number(event.target.reps.value),
      Number(event.target.rpe.value)
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
        value="CANCEL"
        className="cancel-button"
        onClick={props.closeModal}
      />
      <input type="submit" value="ENTER" />
    </form>
  );
};

export default NewSet;
