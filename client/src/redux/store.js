import { configureStore, getDefaultMiddleware } from "redux-starter-kit";
import LogRocket from "logrocket";
import currentWorkoutReducer, {
  currentWorkoutActions
} from "./slices/currentWorkout";
import globalUIReducer, { globalUIActions } from "./slices/globalUI";
import measurementHistoryReducer, {
  measurementHistoryActions
} from "./slices/measurementHistory";
import liftHistoryReducer, { liftHistoryActions } from "./slices/liftHistory";
import userDataReducer, { userDataActions } from "./slices/userData.js";

const store = configureStore({
  reducer: {
    currentWorkout: currentWorkoutReducer,
    measurementHistory: measurementHistoryReducer,
    liftHistory: liftHistoryReducer,
    globalUI: globalUIReducer,
    userData: userDataReducer
  },
  middleware: [...getDefaultMiddleware(), LogRocket.reduxMiddleware()],
  devTools: {
    actionCreators: {
      ...currentWorkoutActions,
      ...measurementHistoryActions,
      ...liftHistoryActions,
      ...globalUIActions,
      ...userDataActions
    }
  }
});

export default store;
