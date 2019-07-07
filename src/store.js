import { configureStore } from 'redux-starter-kit';
import currentWorkoutReducer from './reducers/currentWorkoutReducer';

const store = configureStore({
  reducer: {
    currentWorkout: currentWorkoutReducer
  }
});

export default store;
