import { createSlice } from "redux-starter-kit";

const initialState = {
  userId: 1
};

const userData = createSlice({
  slice: "userData",
  initialState: initialState,
  reducers: {}
});

const { actions, reducer } = userData;
export { actions as userDataActions };
export default reducer;
