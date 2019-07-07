import { configureStore } from 'redux-starter-kit';
import currentWorkoutReducer from './slices/currentWorkout';

const store = configureStore({
  reducer: {
    currentWorkout: currentWorkoutReducer
  }
});

export default store;
