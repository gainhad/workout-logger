import { configureStore } from 'redux-starter-kit';
import currentWorkoutReducer, { currentWorkoutActions } from './slices/currentWorkout';

const store = configureStore({
  reducer: {
    currentWorkout: currentWorkoutReducer
  },
  devTools: {actionCreators: currentWorkoutActions}
});

export default store;
