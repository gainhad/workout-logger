import { createSlice } from 'redux-starter-kit';

const initialState = {
  lifts: [
    {
      name: 'SQUAT',
      sets: [
        { weight: 255, reps: 10, rpe: 6 },
        { weight: 287, reps: 7, rpe: 7 }
      ],
      estimatedOneRepMax: 255
    },
    { name: 'DEADLIFT', sets: [] },
    { name: 'BENCH PRESS', sets: [] }
  ],
  currentLiftIndex: 0
};

function addLiftReducer(state, { payload }) {
  state.lifts.unshift({ name: payload.name, sets: [] });
}

function deleteLiftReducer(state, { payload }) {
  state.lifts.splice(payload.index, 1);
}

function renameLiftReducer(state, { payload }) {
  state.lifts[payload.index].name = payload.name;
}

function addSetReducer(state, { payload }) {
  state.lifts[payload.liftIndex].sets.push(payload.set);
}

function deleteSetReducer(state, { payload }) {
  state.lifts[payload.liftIndex].sets.splice(payload.setIndex, 1);
}

function updateSetReducer(state, { payload }) {
 state.lifts[payload.liftIndex].sets[payload.setIndex] = payload.updatedSet;
}

function updateCurrentLiftIndexReducer(state, { payload }) {
  state.currentLiftIndex = payload.updatedIndex;
}

const currentWorkout = createSlice({
  slice: 'currentWorkout',
  initialState: initialState,
  reducers: {
    addLift: addLiftReducer,
    deleteLift: deleteLiftReducer,
    renameLift: renameLiftReducer,
    addSet: addSetReducer,
    deleteSet: deleteSetReducer,
    updateSet: updateSetReducer,
    updateCurrentLiftIndex: updateCurrentLiftIndexReducer
  }
});

const { actions, reducer } = currentWorkout;
export const { addLift, deleteLift, renameLift, deleteSet } = actions;
export { initialState };
export default reducer;
