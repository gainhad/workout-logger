import { configureStore } from 'redux-starter-kit';

const initialState = {};

const store = configureStore({
  reducer: () => ["test"]
});

export default store;
