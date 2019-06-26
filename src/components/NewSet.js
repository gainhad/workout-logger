import React, { useState } from 'react';
import './NewSet.scss';

const NewSet = props => {
  function onSubmit(event) {
    event.preventDefault();
    console.log('set submitted');
  }

  return (
    <form onSubmit={onSubmit} id="new-set">
      <input type="number" required="true" placeholder="weight" />
      <input type="number" required="true" placeholder="reps" />
      <input type="number" required="true" placeholder="rpe" />
      <input type="button" value="CANCEL" onClick={props.toggleModal} />
      <input type="submit" value="ENTER" />
    </form>
  );
};

export default NewSet;
