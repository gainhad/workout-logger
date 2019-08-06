import { createSlice, createSelector } from "redux-starter-kit";
import { calculateE1RM } from "../../utils/calculations.js";
import { liftHistoryActions } from "./liftHistory.js";
import axios from "axios";

/*
const initialState = {
  lifts: [
    {
      name: "squat",
      sets: [
        { weight: 255, reps: 10, rpe: 6, timestamp: 1562952114000 },
        { weight: 287, reps: 7, rpe: 7, timestamp: 1562952114000 },
        { weight: 287, reps: 8, rpe: 8, timestamp: 1562952114000 }
      ]
    },
    {
      name: "deadlift",
      sets: [{ weight: 144, reps: 5, rpe: 8, timestamp: 1562952114000 }]
    },
    {
      name: "bench press",
      sets: [{ weight: 255, reps: 6, rpe: 9, timestamp: 1562952114000 }]
    }
  ],
  currentLiftIndex: 0,
  restTimer: {
    timeStarted: NaN,
    duration: NaN
  },
  timeStarted: 1562756097322
};
*/

const initialState = {
  lifts: [],
  currentLiftIndex: 0,
  restTimer: {
    timeStarted: NaN,
    duration: NaN
  },
  timeStarted: Date.now()
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
    payload.set.timestamp = Date.now();
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

function startRestTimerReducer(state, { payload }) {
  state.restTimer = {
    timeStarted: payload.timeStarted,
    duration: payload.duration
  };
}

function startWorkoutReducer(state, { payload }) {
  state.lifts = initialState.lifts;
  state.currentLiftIndex = initialState.currentLiftIndex;
  state.restTimer = initialState.restTimer;
  state.timeStarted = payload.timeStarted;
}

function finishWorkoutReducer(state) {}

function resetReducer(state) {
  state.lifts = initialState.lifts;
  state.currentLiftIndex = initialState.currentLiftIndex;
  state.restTimer = initialState.restTimer;
  state.timeStarted = initialState.timeStarted;
}

const currentWorkout = createSlice({
  slice: "currentWorkout",
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
    startWorkout: startWorkoutReducer,
    finishWorkout: finishWorkoutReducer,
    reset: resetReducer
  }
});

// Action creators
function finishWorkout() {
  return (dispatch, getState) => {
    const workoutData = getState().currentWorkout;
    let success = false;
    // Add current workout data to database
    axios
      .post(`/api/user-data/workout-history`, {
        ...workoutData,
        duration: Date.now() - workoutData.timeStarted
      })
      .then(data => dispatch(liftHistoryActions.fetchLiftHistory()))
      .catch(error => console.log(error));
    if (success) {
      dispatch({
        type: "currentWorkout/finishWorkout"
      });
    }
  };
}

function startRestTimer(duration) {
  return {
    type: "currentWorkout/startRestTimer",
    payload: {
      timeStarted: Date.now(),
      duration: duration
    }
  };
}
// Selectors
const getCurrentLiftIndex = createSelector(
  ["currentWorkout.currentLiftIndex"],
  index => index
);

const getCurrentLift = createSelector(
  ["currentWorkout.currentLiftIndex", "currentWorkout.lifts"],
  (index, lifts) => lifts[index]
);

const getSetsForCurrentLift = createSelector(
  ["currentWorkout.currentLiftIndex", "currentWorkout.lifts"],
  (index, lifts) => lifts[index].sets
);

const atEnd = createSelector(
  ["currentWorkout.currentLiftIndex", "currentWorkout.lifts"],
  (index, lifts) => index === lifts.length - 1
);

const atBeginning = createSelector(
  ["currentWorkout.currentLiftIndex"],
  index => index === 0
);

const getHeaviestSet = createSelector(
  ["currentWorkout.currentLiftIndex", "currentWorkout.lifts"],
  (index, lifts) => {
    if (lifts[index] && lifts[index].sets.length) {
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

const areLiftsWithoutSets = createSelector(
  ["currentWorkout.lifts"],
  lifts => lifts.some(lift => lift.sets.length === 0)
);

const { actions, reducer } = currentWorkout;

// Overwite generate actions with custom actions.
actions.startRestTimer = startRestTimer;
actions.finishWorkout = finishWorkout;

export {
  getSetsForCurrentLift,
  getCurrentLiftIndex,
  getCurrentLift,
  atBeginning,
  atEnd,
  getEstimatedOneRepMax,
  areLiftsWithoutSets
};
export { actions as currentWorkoutActions };
export default reducer;
