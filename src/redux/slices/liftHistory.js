import { createSlice, createSelector } from 'redux-starter-kit';

const initialState = {
  squat: {
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

const getLift = (state, props) => state.liftHistory[props.liftName];

const getHistoryForLift = createSelector(
  [getLift],
  liftData =>
    Object.values(liftData.byId).sort(
      (liftA, liftB) => liftB.timestamp - liftA.timestamp
    )
);

const testState = {
  liftHistory: { ...initialState }
};

const { actions, reducer } = liftHistory;

export { getLiftNamesAlphabetized, getHistoryForLift };
export { actions as liftHistoryActions };
export default reducer;
