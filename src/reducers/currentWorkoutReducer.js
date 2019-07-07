import { createSlice } from 'redux-starter-kit';

const initialState = {
  lifts: [
    {
      name: 'DEADLIFT',
      sets: [{ weight: 256, reps: 5, rpe: 8 }]
    },
    {
      name: 'SQUAT',
      sets: [{ weight: 256, reps: 5, rpe: 8 }]
    },
    {
      name: 'BENCHPRESS',
      sets: [{ weight: 256, reps: 5, rpe: 8 }]
    }
  ],
  currentLiftIndex: 0,
};

function addLiftReducer(state, action) {
  state.lifts.push({ name: action.payload.name, sets: [] });
}

function deleteLiftReducer(state, action) {
  state.lifts.splice(action.payload.index, 1);
}

function renameLiftReducer(state, action) {
  state.lifts[action.payload.index].name = action.payload.name;
}

function addSetReducer(state, action) {
  state.lifts[action.payload.index].sets.push(action.payload.set);
}

const currentWorkout = createSlice({
  slice: 'currentWorkout',
  initialState: initialState,
  reducers: {
    addLift: addLiftReducer,
    deleteLift: deleteLiftReducer,
    renameLift: renameLiftReducer,
    addSet: addSetReducer
  }
});

const { actions, reducer } = currentWorkout;
export const { addLift, deleteLift, renameLift } = actions;
export default reducer;
