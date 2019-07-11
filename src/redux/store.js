import { configureStore } from 'redux-starter-kit';
import currentWorkoutReducer, {
  currentWorkoutActions
} from './slices/currentWorkout';
import globalUIReducer, { globalUIActions } from './slices/globalUI';
import measurementHistoryReducer, {
  measurementHistoryActions
} from './slices/measurementHistory';
import liftHistoryReducer, { liftHistoryActions } from './slices/liftHistory';

const store = configureStore({
  reducer: {
    currentWorkout: currentWorkoutReducer,
    measurementHistory: measurementHistoryReducer,
    liftHistory: liftHistoryReducer,
    globalUI: globalUIReducer
  },
  devTools: {
    actionCreators: {
      ...currentWorkoutActions,
      ...measurementHistoryActions,
      ...liftHistoryActions,
      ...globalUIActions
    }
  }
});

export default store;
