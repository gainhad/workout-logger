import { createSlice, createSelector } from "redux-starter-kit";
import axios from "axios";

/*
const initialState = {
  weight: {
    measurements: [
      {
        timestamp: 1562783942272,
        entry: 160
      },
      {
        timestamp: 1562797642272,
        entry: 190
      },
      {
        timestamp: 1562123042272,
        entry: 80
      },
      {
        timestamp: 1562782452272,
        entry: 480
      }
    ],
    unit: 'lbs'
  },
  waist: {
    measurements: [
      {
        timestamp: 1562783942272,
        entry: 60
      },
      {
        timestamp: 1562797642272,
        entry: 90
      },
      {
        timestamp: 1562123042272,
        entry: 30
      },
      {
        timestamp: 1562782452272,
        entry: 80
      }
    ],
    unit: 'in'
  }
};
*/

const initialState = {
  data: {},
  fetched: false,
  isFetching: false,
  isError: false
};

// Reducers
function addOrUpdateMeasurementReducer(state, { payload, meta }) {
  if (isNaN(meta.index)) {
    state.data[meta.type].measurements.unshift(payload);
  } else {
    state.data[meta.type][meta.index].measurement = payload.measurement;
  }
}

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
  state.isFetching = false;
  state.fetched = true;
}

const measurementHistory = createSlice({
  slice: "measurementHistory",
  initialState: initialState,
  reducers: {
    data: dataReducer,
    fetched: fetchedReducer,
    isFetching: isFetchingReducer,
    isError: isErrorReducer,
    addOrUpdateMeasurement: addOrUpdateMeasurementReducer
  }
});

// Custom Actions
function fetchMeasurementHistory(user) {
  return dispatch => {
    dispatch(measurementHistory.actions.isFetching());
    fetch(`/api/user-data/${user}/measurement-history`)
      .then(res => res.json())
      .then(json => dispatch(measurementHistory.actions.data(json)))
      .catch(error => dispatch(measurementHistory.actions.isError(error)));
  };
}

function addOrUpdateMeasurement(index, type, unit, measurement) {
  return dispatch => {
    const timestamp = Date.now();
    axios
      .post(`/api/user-data/demoUser/measurement-history/`, {
        type: type,
        measurement: measurement,
        timestamp: timestamp,
        unit: unit
      })
      .then(res =>
        dispatch({
          type: "measurementHistory/addOrUpdateMeasurement",
          meta: {
            index: index,
            type: type
          },
          payload: {
            id: res.data.id,
            measurement: measurement,
            timestamp: timestamp
          }
        })
      );
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
