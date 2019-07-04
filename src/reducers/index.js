import { combineReducers } from 'redux';
import currentWorkoutReducer from './currentWorkoutReducer';

export default combineReducers({
  currentWorkout: currentWorkoutReducer
});
