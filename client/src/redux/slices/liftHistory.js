import { createSlice, createSelector } from "redux-starter-kit";
import { calculateE1RM } from "../../utils/calculations.js";
import axios from "axios";

/*
const initialState = {
  squat: {
    byId: {
      0: {
        sets: [
          {
            weight: 200,
            reps: 8,
            rpe: 8
          },
          {
            weight: 175,
            reps: 8,
            rpe: 8
          },
          {
            weight: 225,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562704818000
      },
      1: {
        sets: [
          {
            weight: 200,
            reps: 8,
            rpe: 8
          },
          {
            weight: 205,
            reps: 8,
            rpe: 8
          },
          {
            weight: 235,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562618418000
      },
      2: {
        sets: [
          {
            weight: 205,
            reps: 8,
            rpe: 8
          },
          {
            weight: 205,
            reps: 8,
            rpe: 8
          },
          {
            weight: 215,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562445618000
      },
      3: {
        sets: [
          {
            weight: 205,
            reps: 8,
            rpe: 8
          },
          {
            weight: 205,
            reps: 8,
            rpe: 8
          },
          {
            weight: 235,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562272818000
      },
      4: {
        sets: [
          {
            weight: 205,
            reps: 8,
            rpe: 8
          },
          {
            weight: 205,
            reps: 8,
            rpe: 8
          },
          {
            weight: 245,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562100018000
      }
    },
    allIds: [0, 1, 2, 3, 4]
  },
  deadlift: {
    byId: {
      0: {
        sets: [
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562704818000
      },
      1: {
        sets: [
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562618418000
      },
      2: {
        sets: [
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562445618000
      },
      3: {
        sets: [
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562272818000
      },
      4: {
        sets: [
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562100018000
      }
    },
    allIds: [0, 1, 2, 3, 4]
  },
  'bench press': {
    byId: {
      0: {
        sets: [
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562704818000
      },
      1: {
        sets: [
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562618418000
      },
      2: {
        sets: [
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562445618000
      },
      3: {
        sets: [
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562272818000
      },
      4: {
        sets: [
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          },
          {
            weight: 255,
            reps: 8,
            rpe: 8
          }
        ],
        timestamp: 1562100018000
      }
    },
    allIds: [0, 1, 2, 3, 4]
  }
};
*/

const initialState = {
  data: {},
  fetched: false,
  isFetching: false,
  isError: false
};

//Reducers
function isFetchingReducer(state) {
  state.isFetching = true;
}

function fetchedReducer(state) {
  state.fetched = true;
}

function isErrorReducer(state) {
  state.isError = true;
}

function dataReducer(state, { payload }) {
  state.data = payload;
  state.fetched = true;
  state.isFetching = false;
}

const liftHistory = createSlice({
  slice: "liftHistory",
  initialState: initialState,
  reducers: {
    data: dataReducer,
    isFetching: isFetchingReducer,
    isError: isErrorReducer
  }
});

// Actions
function fetchLiftHistory(user) {
  return dispatch => {
    user = "demoUser";
    dispatch(liftHistory.actions.isFetching());
    axios(`/api/user-data/${user}/lift-history`)
      .then(res => {
        dispatch(liftHistory.actions.data(res.data));
      })
      .catch(error => dispatch(liftHistory.actions.isError(error)));
  };
}

const getLiftNamesAlphabetized = createSelector(
  ["liftHistory"],
  liftHistory => Object.keys(liftHistory.data).sort()
);

const getLift = (state, props) => {
  return state.liftHistory.data[props.name];
};

const getHistoryForLift = createSelector(
  [getLift],
  liftData =>
    !liftData
      ? liftData
      : Object.values(liftData.byId).sort(
          (liftA, liftB) =>
            liftB.sets[0].time_completed - liftA.sets[0].time_completed
        )
);

const getHeaviestSetHistoryForLift = createSelector(
  [getHistoryForLift],
  liftHistory =>
    !liftHistory
      ? liftHistory
      : liftHistory.map(entry => {
          let heaviestSet = entry.sets
            .slice()
            .sort((setA, setB) => setB.weight - setA.weight)[0];
          return {
            heaviestSet: heaviestSet
          };
        })
);

const getE1RMHistoryForLift = createSelector(
  [getHeaviestSetHistoryForLift],
  heaviestSets =>
    !heaviestSets
      ? heaviestSets
      : {
          entries: heaviestSets
            .filter(entry => entry.heaviestSet.rpe >= 6.5)
            .map(entry => {
              return {
                e1rm: calculateE1RM(
                  entry.heaviestSet.weight,
                  entry.heaviestSet.reps,
                  entry.heaviestSet.rpe
                ),
                timestamp: entry.heaviestSet.time_completed,
                id: entry.heaviestSet.id
              };
            }),
          unit: "lbs"
        }
);

const testState = {
  liftHistory: { ...initialState }
};

const { actions, reducer } = liftHistory;

actions.fetchLiftHistory = fetchLiftHistory;

export {
  getLiftNamesAlphabetized,
  getHistoryForLift,
  getHeaviestSetHistoryForLift,
  getE1RMHistoryForLift
};
export { actions as liftHistoryActions };
export default reducer;
