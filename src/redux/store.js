import { configureStore } from 'redux-starter-kit';
import currentWorkoutReducer, {
  currentWorkoutActions
} from './slices/currentWorkout';
import globalUIReducer, {
  globalUIActions }
from './slices/globalUI';

const store = configureStore({
  reducer: {
    currentWorkout: currentWorkoutReducer,
    globalUI: globalUIReducer
  },
  devTools: { actionCreators: {...currentWorkoutActions, ...globalUIActions} }
});

export default store;
