import { createSlice } from "redux-starter-kit";
import { measurementHistoryActions } from "./measurementHistory";
import { liftHistoryActions } from "./liftHistory";
import { currentWorkoutActions } from "./currentWorkout";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  authenticationChecked: false,
  authenticationInProgress: false,
  authenticationError: false,
  demo: false
};

function isLoggedInReducer(state, { payload }) {
  state.isLoggedIn = payload;
  state.authenticationChecked = true;
  state.authenticationInProgress = false;
}

function authenticationInProgressReducer(state) {
  state.authenticationInProgress = true;
}

function authenticationErrorReducer(state) {
  state.authenticationError = true;
}

function demoReducer(state, { payload }) {
  state.demo = payload;
}

const userData = createSlice({
  slice: "userData",
  initialState: initialState,
  reducers: {
    isLoggedIn: isLoggedInReducer,
    authenticationInProgress: authenticationInProgressReducer,
    authenticationError: authenticationErrorReducer,
    demo: demoReducer
  }
});

// Actions
function checkAuthentication() {
  return dispatch => {
    dispatch({ type: "userData/authenticationInProgress" });
    axios.get("/api/check-authentication").then(res => {
      dispatch({
        type: "userData/isLoggedIn",
        payload: res.data.status
      });
      dispatch({
        type: "userData/demo",
        payload: res.data.demo
      });
    });
  };
}

function logOut() {
  return dispatch => {
    axios.get("/api/logout").then(res => {
      dispatch({ type: "userData/isLoggedIn", payload: false });
      dispatch(measurementHistoryActions.reset());
      dispatch(liftHistoryActions.reset());
      dispatch(currentWorkoutActions.reset());
    });
  };
}

const { actions, reducer } = userData;
actions.checkAuthentication = checkAuthentication;
actions.logOut = logOut;
export { actions as userDataActions };
export default reducer;
