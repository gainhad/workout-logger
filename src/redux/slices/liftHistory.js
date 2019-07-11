import { createSlice, createSelector } from 'redux-starter-kit';
import { calculateE1RM } from '../../utils/calculations.js';

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

const liftHistory = createSlice({
  slice: 'liftHistory',
  initialState: initialState,
  reducers: {}
});

const getLiftNamesAlphabetized = createSelector(
  ['liftHistory'],
  lifts => Object.keys(lifts).sort()
);

const getLift = (state, props) => {
  console.log('get lift selector called');
  return state.liftHistory[props.name];
};

const getHistoryForLift = createSelector(
  [getLift],
  liftData =>
    Object.values(liftData.byId).sort(
      (liftA, liftB) => liftB.timestamp - liftA.timestamp
    )
);

const getHeaviestSetHistoryForLift = createSelector(
  [getHistoryForLift],
  liftHistory =>
    liftHistory.map(entry => {
      return {
        heaviestSet: entry.sets
          .slice()
          .sort((setA, setB) => setB.weight - setA.weight)[0],
        timestamp: entry.timestamp
      };
    })
);

const getE1RMHistoryForLift = createSelector(
  [getHeaviestSetHistoryForLift],
  heaviestSets => {
    return {
      entries: heaviestSets
        .filter(entry => entry.heaviestSet.rpe >= 6.5)
        .map(entry => {
          return {
            e1rm: calculateE1RM(
              entry.heaviestSet.weight,
              entry.heaviestSet.reps,
              entry.heaviestSet.rpe
            ),
            timestamp: entry.timestamp
          };
        }),
      unit: 'lbs'
    };
  }
);

const testState = {
  liftHistory: { ...initialState }
};

const { actions, reducer } = liftHistory;

export {
  getLiftNamesAlphabetized,
  getHistoryForLift,
  getHeaviestSetHistoryForLift,
  getE1RMHistoryForLift
};
export { actions as liftHistoryActions };
export default reducer;
