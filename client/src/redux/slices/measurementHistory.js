import { createSlice, createSelector } from 'redux-starter-kit';

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

const getMeasurementHistory = (state, props) => {
  console.log('selector called');
  let newMeasurements = state.measurementHistory[props.name].measurements.map(
    e => {
      return { ...e };
    }
  );
  return {
    entries: newMeasurements,
    unit: state.measurementHistory[props.name].unit
  };
};

const getMeasurementTypesAlphabetized = createSelector(
  ['measurementHistory'],
  history => {
    return Object.keys(history)
      .sort()
      .map(name => {
        return { name: name, unit: history[name].unit };
      });
  }
);

const { actions, reducer } = measurementHistory;

// Overwite generated actions with custom actions.
actions.addOrUpdateMeasurement = addOrUpdateMeasurement;

export { getMeasurementTypesAlphabetized, getMeasurementHistory };
export { actions as measurementHistoryActions };
export default reducer;
