import { configureStore } from 'redux-starter-kit';
import currentWorkoutReducer, {
  currentWorkoutActions
} from './slices/currentWorkout';
import globalUIReducer, { globalUIActions } from './slices/globalUI';
import measurementHistoryReducer, {
  measurementHistoryActions
} from './slices/measurementHistory';

const store = configureStore({
  reducer: {
    currentWorkout: currentWorkoutReducer,
    measurementHistory: measurementHistoryReducer,
    globalUI: globalUIReducer
  },
  devTools: {
    actionCreators: {
      ...currentWorkoutActions,
      ...measurementHistoryActions,
      ...globalUIActions
    }
  }
});

export default store;
