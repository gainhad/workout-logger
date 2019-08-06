import { createSlice, createSelector } from "redux-starter-kit";
import { calculateE1RM } from "../../utils/calculations.js";
import axios from "axios";

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

function isErrorReducer(state) {
  state.isError = true;
}

function dataReducer(state, { payload }) {
  state.data = payload;
  state.fetched = true;
  state.isFetching = false;
}

function resetReducer(state) {
  state.data = initialState.data;
  state.fetched = initialState.fetched;
  state.isFetching = initialState.isFetching;
  state.isError = initialState.isError;
}

const liftHistory = createSlice({
  slice: "liftHistory",
  initialState: initialState,
  reducers: {
    data: dataReducer,
    isFetching: isFetchingReducer,
    isError: isErrorReducer,
    reset: resetReducer
  }
});

// Actions
function fetchLiftHistory() {
  return dispatch => {
    dispatch(liftHistory.actions.isFetching());
    axios(`/api/user-data/lift-history`)
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
            })
            .sort((a, b) => a.timestamp - b.timestamp),
          unit: "lbs"
        }
);

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
