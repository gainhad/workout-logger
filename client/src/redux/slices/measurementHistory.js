import { createSlice, createSelector } from "redux-starter-kit";
import axios from "axios";

const initialState = {
  data: {},
  fetchingSuccess: false,
  fetchingInProgress: false,
  fetchingError: false,
  addingInProgress: false,
  addingSuccess: false,
  addingError: false
};

// Reducers
function addOrUpdateMeasurementReducer(state, { payload, meta }) {
  if (isNaN(meta.index)) {
    // Handle first data entry
    if (!state.data[meta.type]) {
      state.data[meta.type] = {
        measurements: [],
        unit: meta.unit
      };
    }
    state.data[meta.type].measurements.unshift(payload);
  } else {
    state.data[meta.type][meta.index].measurement = payload.measurement;
  }
}

function fetchingInProgressReducer(state) {
  state.fetchingInProgress = true;
}

function fetchingSuccessReducer(state) {
  state.fetchingSuccess = true;
}

function fetchingErrorReducer(state) {
  state.fetchingError = true;
}

function addingSuccessReducer(state) {
  state.addingSuccess = true;
  state.addingError = false;
  state.addingInProgress = false;
}

function addingErrorReducer(state) {
  state.addingError = true;
  state.addingSuccess = false;
  state.addingInProgress = false;
}

function addingInProgressReducer(state) {
  state.addingInProgress = true;
}

function dataReducer(state, { payload }) {
  state.data = payload;
  state.fetchingInProgress = false;
  state.fetchingSuccess = true;
}

function resetAddingReducer(state) {
  state.addingInProgress = false;
  state.addingSuccess = false;
  state.addingError = false;
}

function resetReducer(state) {
  state.data = initialState.data;
  state.fetchingSuccess = initialState.fetchingSuccess;
  state.fetchingInProgress = initialState.fetchingInProgress;
  state.fetchingError = initialState.fetchingError;
  resetAddingReducer();
}

const measurementHistory = createSlice({
  slice: "measurementHistory",
  initialState: initialState,
  reducers: {
    data: dataReducer,
    fetchingSuccess: fetchingSuccessReducer,
    fetchingInProgress: fetchingInProgressReducer,
    fetchingError: fetchingErrorReducer,
    addingSuccess: addingSuccessReducer,
    addingInProgress: addingInProgressReducer,
    addingError: addingErrorReducer,
    addOrUpdateMeasurement: addOrUpdateMeasurementReducer,
    resetAdding: resetAddingReducer,
    reset: resetReducer
  }
});

// Custom Actions
function fetchMeasurementHistory() {
  return dispatch => {
    dispatch(measurementHistory.actions.fetchingInProgress());
    fetch(`/api/user-data/measurement-history`)
      .then(res => res.json())
      .then(json => dispatch(measurementHistory.actions.data(json)))
      .catch(error =>
        dispatch(measurementHistory.actions.fetchingError(error))
      );
  };
}

function addOrUpdateMeasurement(index, type, unit, measurement) {
  return dispatch => {
    const timestamp = Date.now();
    dispatch({ type: "measurementHistory/addingInProgress" });
    axios
      .post(`/api/user-data/measurement-history/`, {
        type: type,
        measurement: measurement,
        timestamp: timestamp,
        unit: unit
      })
      .then(res => {
        dispatch({
          type: "measurementHistory/addOrUpdateMeasurement",
          meta: {
            index: index,
            type: type,
            unit: unit
          },
          payload: {
            id: res.data.id,
            measurement: measurement,
            timestamp: timestamp
          }
        });
        dispatch({
          type: "measurementHistory/addingSuccess"
        });
      })
      .catch(error => {
        console.log("here");
        dispatch({ type: "measurementHistory/addingError" });
      });
  };
}

const getMeasurementHistory = (state, props) => {
  if (state.measurementHistory.isFetching) {
    return false;
  }
  let newMeasurements = state.measurementHistory.data[
    props.name
  ].measurements.map(e => {
    return { ...e };
  });
  return {
    entries: newMeasurements,
    unit: state.measurementHistory.data[props.name].unit
  };
};

const getMeasurementTypesAlphabetized = createSelector(
  ["measurementHistory.data"],
  history =>
    Object.keys(history)
      .sort()
      .map(name => {
        return { name: name, unit: history[name].unit };
      })
);

const { actions, reducer } = measurementHistory;

// Overwite generated actions with custom actions.
actions.addOrUpdateMeasurement = addOrUpdateMeasurement;
actions.fetchMeasurementHistory = fetchMeasurementHistory;

export { getMeasurementTypesAlphabetized, getMeasurementHistory };
export { actions as measurementHistoryActions };
export default reducer;
