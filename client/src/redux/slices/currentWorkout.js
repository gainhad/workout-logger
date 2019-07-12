import { createSlice, createSelector } from 'redux-starter-kit';
import { calculateE1RM } from '../../utils/calculations.js';

const initialState = {
  lifts: [
    {
      name: 'SQUAT',
      sets: [
        { weight: 255, reps: 10, rpe: 6 },
        { weight: 287, reps: 7, rpe: 7 },
        { weight: 287, reps: 8, rpe: 8 }
      ]
    },
    { name: 'DEADLIFT', sets: [] },
    { name: 'BENCH PRESS', sets: [] }
  ],
  currentLiftIndex: 0,
  restTimer: {
    timeStarted: NaN,
    duration: NaN
  },
  timeStarted: 1562756097322
};

function addOrRenameLiftReducer(state, { payload }) {
  if (isNaN(payload.liftIndex)) {
    state.lifts.unshift({ name: payload.name, sets: [] });
  } else {
    state.lifts[payload.liftIndex].name = payload.name;
  }
}

function deleteLiftReducer(state, { payload }) {
  state.lifts.splice(payload.index, 1);
}

function renameLiftReducer(state, { payload }) {
  state.lifts[payload.index].name = payload.name;
}

function addOrUpdateSetReducer(state, { payload }) {
  if (isNaN(payload.setIndex)) {
    state.lifts[payload.liftIndex].sets.push(payload.set);
  } else {
    state.lifts[payload.liftIndex].sets[payload.setIndex] = payload.set;
  }
}

function deleteSetReducer(state, { payload }) {
  state.lifts[payload.liftIndex].sets.splice(payload.setIndex, 1);
}

function updateSetReducer(state, { payload }) {
  state.lifts[payload.liftIndex].sets[payload.setIndex] = payload.updatedSet;
}

function incrementCurrentLiftIndexReducer(state) {
  if (state.currentLiftIndex < state.lifts.length - 1) {
    ++state.currentLiftIndex;
  }
}

function decrementCurrentLiftIndexReducer(state) {
  if (state.currentLiftIndex > 0) {
    --state.currentLiftIndex;
  }
}

function startRestTimer(duration) {
  return {
    type: 'currentWorkout/startRestTimer',
    payload: {
      timeStarted: Date.now(),
      duration: duration
    }
  };
}

function startRestTimerReducer(state, { payload }) {
  state.restTimer = {
    timeStarted: payload.timeStarted,
    duration: payload.duration
  };
}

function addTimeStartedReducer(state, { payload }) {
  state.timeStarted = payload;
}

const currentWorkout = createSlice({
  slice: 'currentWorkout',
  initialState: initialState,
  reducers: {
    addOrRenameLift: addOrRenameLiftReducer,
    deleteLift: deleteLiftReducer,
    renameLift: renameLiftReducer,
    addOrUpdateSet: addOrUpdateSetReducer,
    deleteSet: deleteSetReducer,
    updateSet: updateSetReducer,
    incrementCurrentLiftIndex: incrementCurrentLiftIndexReducer,
    decrementCurrentLiftIndex: decrementCurrentLiftIndexReducer,
    startRestTimer: startRestTimerReducer,
    addTimeStarted: addTimeStartedReducer
  }
});

// Selectors
const getCurrentLiftIndex = createSelector(
  ['currentWorkout.currentLiftIndex'],
  index => index
);

const getCurrentLift = createSelector(
  ['currentWorkout.currentLiftIndex', 'currentWorkout.lifts'],
  (index, lifts) => lifts[index]
);

const getSetsForCurrentLift = createSelector(
  ['currentWorkout.currentLiftIndex', 'currentWorkout.lifts'],
  (index, lifts) => lifts[index].sets
);

const atEnd = createSelector(
  ['currentWorkout.currentLiftIndex', 'currentWorkout.lifts'],
  (index, lifts) => index === lifts.length - 1
);

const atBeginning = createSelector(
  ['currentWorkout.currentLiftIndex'],
  index => index === 0
);

const getHeaviestSet = createSelector(
  ['currentWorkout.currentLiftIndex', 'currentWorkout.lifts'],
  (index, lifts) => {
    if (lifts[index].sets.length) {
      return lifts[index].sets.reduce((setA, setB) => {
        return setA.weight >= setB.weight ? setA : setB;
      });
    }
  }
);

const getEstimatedOneRepMax = createSelector(
  [getHeaviestSet],
  set => {
    if (set && set.rpe >= 6.5) {
      return calculateE1RM(set.weight, set.reps, set.rpe);
    }
  }
);

const { actions, reducer } = currentWorkout;

// Overwite generate actions with custom actions.
actions.startRestTimer = startRestTimer;

export {
  getSetsForCurrentLift,
  getCurrentLiftIndex,
  getCurrentLift,
  atBeginning,
  atEnd,
  getEstimatedOneRepMax
};
export { actions as currentWorkoutActions };
export default reducer;