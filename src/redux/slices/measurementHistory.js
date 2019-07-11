import { createSlice, createSelector } from 'redux-starter-kit';

const initialState = {
  weight: [
    {
      timestamp: 1562783942272,
      measurement: 160
    },
    {
      timestamp: 1562797642272,
      measurement: 190
    },
    {
      timestamp: 1562123042272,
      measurement: 80
    },
    {
      timestamp: 1562782452272,
      measurement: 480
    }
  ],
  waist: [
    {
      timestamp: 1562783942272,
      measurement: 60
    },
    {
      timestamp: 1562797642272,
      measurement: 90
    },
    {
      timestamp: 1562123042272,
      measurement: 30
    },
    {
      timestamp: 1562782452272,
      measurement: 80
    }
  ]
};

// Custom Actions
function addOrUpdateMeasurement(index, type, measurement) {
  return {
    type: 'measurementHistory/addOrUpdateMeasurement',
    meta: {
      index: index,
      type: type
    },
    payload: {
      timestamp: Date.now(),
      measurement: measurement
    }
  };
}

// Reducers
function addOrUpdateMeasurementReducer(state, { payload, meta }) {
  if (isNaN(meta.index)) {
    state[meta.type].unshift(payload);
  } else {
    state[meta.type][meta.index].measurement = payload.measurement;
  }
}

const measurementHistory = createSlice({
  slice: 'measurementHistory',
  initialState: initialState,
  reducers: {
    addOrUpdateMeasurement: addOrUpdateMeasurementReducer
  }
});

const getMeasurementTypesAlphabetized = createSelector(
  ['measurementHistory'],
  history => Object.keys(history).sort()
);

const { actions, reducer } = measurementHistory;

// Overwite generated actions with custom actions.
actions.addOrUpdateMeasurement = addOrUpdateMeasurement;

export { getMeasurementTypesAlphabetized };
export { actions as measurementHistoryActions };
export default reducer;
