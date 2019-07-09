import { createSlice } from 'redux-starter-kit';

const initialState = {
  isBlurred: false
}

function isBlurredReducer(state, { payload }) {
  state.isBlurred = payload;
}

const globalUI = createSlice({
  slice: 'globalUI',
  initialState: initialState,
  reducers: {
    isBlurred: isBlurredReducer
  }
});

const { actions, reducer } = globalUI;
export { actions as globalUIActions };
export default reducer;
