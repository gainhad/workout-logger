import React from 'react';
import './NewSet.scss';
import { connect } from 'react-redux';
import { addSet } from '../redux/slices/currentWorkout';

const NewSet = props => {
  function onSubmit(event) {
    event.preventDefault();
    props.toggleModal();
    props.addSet({
      liftIndex: props.currentLiftIndex,
      set: {
        weight: Number(event.target.weight.value),
        reps: Number(event.target.reps.value),
        rpe: Number(event.target.rpe.value)
      }
    });
  }

  return (
    <form onSubmit={onSubmit} id="new-set">
      <input name="weight" type="number" required={true} placeholder="weight" />
      <input name="reps" type="number" required={true} placeholder="reps" />
      <input name="rpe" type="number" required={true} placeholder="rpe" />
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

const mapStateToProps = state => {
  return {
    currentLiftIndex: state.currentWorkout.currentLiftIndex
  };
};

const mapDispatchToProps = {
  addSet: addSet
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewSet);
