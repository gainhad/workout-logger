import { createSlice } from "redux-starter-kit";

const initialState = {
  userId: undefined,
  isAuthenticated: false,
  authentificationInProgress: false,
  authentificationFailed: false
};

function userIdReducer(state, { payload }) {
  state.userId = payload;
  state.isAuthenticated = true;
}

function authentificationInProgressReducer(state) {
  state.authentificationInProgress = true;
}

function authentificationFailedReducer(state) {
  state.authentificationFailed = true;
}

const userData = createSlice({
  slice: "userData",
  initialState: initialState,
  reducers: {
    userId: userIdReducer,
    authentificationInProgress: authentificationInProgressReducer,
    authentificationFailed: authentificationFailedReducer
  }
});

const { actions, reducer } = userData;
export { actions as userDataActions };
export default reducer;
