import React, {useState} from 'react';
import './NewSet.scss';
import { useSelector, useDispatch } from 'react-redux';
import { currentWorkoutActions } from '../redux/slices/currentWorkout';
import NewRestTimer from './NewRestTimer';

const NewSet = props => {
  const currentLiftIndex = useSelector(
    state => state.currentWorkout.currentLiftIndex
  );
  const dispatch = useDispatch();
  const addSet = set => dispatch(currentWorkoutActions.addSet(set));
  const [setEntered, setSetEntered] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setSetEntered(true);
    addSet({
      liftIndex: currentLiftIndex,
      set: {
        weight: Number(event.target.weight.value),
        reps: Number(event.target.reps.value),
        rpe: Number(event.target.rpe.value)
      }
    });
  }
  if (!setEntered) {
    return (
      <form onSubmit={onSubmit} id="new-set">
        <input
          name="weight"
          type="number"
          required={true}
          placeholder="weight"
        />
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
  } else {
    return <NewRestTimer closeModal={props.closeModal} />;
  }
};

export default NewSet;
