import currentWorkoutReducer, {
  initialState as preloadedState
} from './currentWorkout.js';
import expect from 'expect';

describe('currentWorkout reducer', () => {
  // States for use in tests
  const initialState_Empty = {
    lifts: [],
    currentLiftIndex: 0
  };
  const initialState_One_Lift = {
    lifts: [{ name: 'SQUAT', sets: [] }],
    currentLiftIndex: 0
  };
  const initialState_Index_One = {
    lifts: [{ name: 'SQUAT', sets: [] }],
    currentLiftIndex: 1
  };
  const initialState_Multiple_Lifts = {
    lifts: [
      {
        name: 'SQUAT',
        sets: [
          { weight: 100, reps: 10, rpe: 10 },
          { weight: 100, reps: 10, rpe: 10 }
        ]
      },
      {
        name: 'BENCH PRESS',
        sets: [
          { weight: 100, reps: 10, rpe: 10 },
          { weight: 100, reps: 10, rpe: 10 }
        ]
      },
      { name: 'DEADLIFT', sets: [] }
    ],
    currentLiftIndex: 0
  };

  it('Should return the initial state', () => {
    expect(currentWorkoutReducer(undefined, {})).toEqual(preloadedState);
  });

  it('should handle adding the first lift', () => {
    const expectedState = {
      lifts: [{ name: 'TEST LIFT', sets: []}],
      currentLiftIndex: 0
    };
    const action = {
      type: 'currentWorkout/addLift',
      payload: { name: 'TEST LIFT' }
    };
    expect(currentWorkoutReducer(initialState_Empty, action)).toEqual(
      expectedState
    );
  });

  it('should handle adding more lifts', () => {
    const expectedState = {
      lifts: [
        { name: 'TEST LIFT', sets: []},
        { name: 'SQUAT', sets: []}
      ],
      currentLiftIndex: 0
    };
    const action = {
      type: 'currentWorkout/addLift',
      payload: { name: 'TEST LIFT' }
    };
    expect(currentWorkoutReducer(initialState_One_Lift, action)).toEqual(
      expectedState
    );
  });
  it('should handle deleting the first lift', () => {
    const expectedState = {
      lifts: [
        {
          name: 'BENCH PRESS',
          sets: [
            { weight: 100, reps: 10, rpe: 10 },
            { weight: 100, reps: 10, rpe: 10 }
          ]
        },
        { name: 'DEADLIFT', sets: [] }
      ],
      currentLiftIndex: 0
    };
    const action = {
      type: 'currentWorkout/deleteLift',
      payload: { index: 0 }
    };
    expect(currentWorkoutReducer(initialState_Multiple_Lifts, action)).toEqual(
      expectedState
    );
  });

  it('should handle deleting the last lift', () => {
    const expectedState = {
      lifts: [
        {
          name: 'SQUAT',
          sets: [
            { weight: 100, reps: 10, rpe: 10 },
            { weight: 100, reps: 10, rpe: 10 }
          ]
        },
        {
          name: 'BENCH PRESS',
          sets: [
            { weight: 100, reps: 10, rpe: 10 },
            { weight: 100, reps: 10, rpe: 10 }
          ]
        }
      ],
      currentLiftIndex: 0
    };
    const action = {
      type: 'currentWorkout/deleteLift',
      payload: { index: 2 }
    };
    expect(currentWorkoutReducer(initialState_Multiple_Lifts, action)).toEqual(
      expectedState
    );
  });
  it('should handle deleting a middle lift', () => {
    const expectedState = {
      lifts: [
        {
          name: 'SQUAT',
          sets: [
            { weight: 100, reps: 10, rpe: 10 },
            { weight: 100, reps: 10, rpe: 10 }
          ]
        },
        { name: 'DEADLIFT', sets: [] }
      ],
      currentLiftIndex: 0
    };
    const action = {
      type: 'currentWorkout/deleteLift',
      payload: { index: 1 }
    };
    expect(currentWorkoutReducer(initialState_Multiple_Lifts, action)).toEqual(
      expectedState
    );
  });
  it('should handle renaming a lift', () => {
    const expectedState = {
      lifts: [
        {
          name: 'SQUAT',
          sets: [
            { weight: 100, reps: 10, rpe: 10 },
            { weight: 100, reps: 10, rpe: 10 }
          ]
        },
        {
          name: 'TEST LIFT',
          sets: [
            { weight: 100, reps: 10, rpe: 10 },
            { weight: 100, reps: 10, rpe: 10 }
          ]
        },
        { name: 'DEADLIFT', sets: [] }
      ],
      currentLiftIndex: 0
    };
    const action = {
      type: 'currentWorkout/renameLift',
      payload: { index: 1, name: 'TEST LIFT' }
    };
    expect(currentWorkoutReducer(initialState_Multiple_Lifts, action)).toEqual(
      expectedState
    );
  });
  it('should handle adding a set', () => {
    const expectedState = {
      lifts: [
        {
          name: 'SQUAT',
          sets: [
            { weight: 100, reps: 10, rpe: 10 },
            { weight: 100, reps: 10, rpe: 10 }
          ]
        },
        {
          name: 'BENCH PRESS',
          sets: [
            { weight: 100, reps: 10, rpe: 10 },
            { weight: 100, reps: 10, rpe: 10 },
            { weight: 200, reps: 5, rpe: 5 }
          ]
        },
        { name: 'DEADLIFT', sets: [] }
      ],
      currentLiftIndex: 0
    };
    const action = {
      type: 'currentWorkout/addSet',
      payload: { liftIndex: 1, set: { weight: 200, reps: 5, rpe: 5 } }
    };
    expect(currentWorkoutReducer(initialState_Multiple_Lifts, action)).toEqual(
      expectedState
    );
  });
  it('should handle deleting a set', () => {
    const expectedState = {
      lifts: [
        {
          name: 'SQUAT',
          sets: [
            { weight: 100, reps: 10, rpe: 10 },
            { weight: 100, reps: 10, rpe: 10 }
          ]
        },
        {
          name: 'BENCH PRESS',
          sets: [{ weight: 100, reps: 10, rpe: 10 }]
        },
        { name: 'DEADLIFT', sets: [] }
      ],
      currentLiftIndex: 0
    };
    const action = {
      type: 'currentWorkout/deleteSet',
      payload: { liftIndex: 1, setIndex: 1 }
    };
    expect(currentWorkoutReducer(initialState_Multiple_Lifts, action)).toEqual(
      expectedState
    );
  });
  it('should handle updating a set', () => {
    const expectedState = {
      lifts: [
        {
          name: 'SQUAT',
          sets: [
            { weight: 100, reps: 10, rpe: 10 },
            { weight: 100, reps: 10, rpe: 10 }
          ]
        },
        {
          name: 'BENCH PRESS',
          sets: [
            { weight: 100, reps: 10, rpe: 10 },
            { weight: 150, reps: 5, rpe: 5 }
          ]
        },
        { name: 'DEADLIFT', sets: [] }
      ],
      currentLiftIndex: 0
    };
    const action = {
      type: 'currentWorkout/updateSet',
      payload: {
        liftIndex: 1,
        setIndex: 1,
        updatedSet: { weight: 150, reps: 5, rpe: 5 }
      }
    };
    expect(currentWorkoutReducer(initialState_Multiple_Lifts, action)).toEqual(
      expectedState
    );
  });
  it('should handle incrementing currentLiftIndex if less than number of lifts', () => {
    const expectedState = {
      lifts: [
        {
          name: 'SQUAT',
          sets: [
            { weight: 100, reps: 10, rpe: 10 },
            { weight: 100, reps: 10, rpe: 10 }
          ]
        },
        {
          name: 'BENCH PRESS',
          sets: [
            { weight: 100, reps: 10, rpe: 10 },
            { weight: 100, reps: 10, rpe: 10 }
          ]
        },
        { name: 'DEADLIFT', sets: [] }
      ],
      currentLiftIndex: 1
    }
    const action = {
      type: 'currentWorkout/incrementCurrentLiftIndex',
    };
    expect(currentWorkoutReducer(initialState_Multiple_Lifts, action)).toEqual(
      expectedState
    );
  });
  it('should not incrememnt currentLiftIndex if = num. lifts', () => {
    const expectedState = {
      lifts: [ {name: 'SQUAT', sets:[]}],
      currentLiftIndex: 0
    }
    const action = {
      type: 'currentWorkout/incrementCurrentLiftIndex',
    };
    expect(currentWorkoutReducer(initialState_One_Lift, action)).toEqual(
      expectedState
    );
  });
  it('should decrement currentLiftIndex if > number of lifts', () => {
    const expectedState = {
      lifts: [{ name: 'SQUAT', sets: []}],
      currentLiftIndex: 0
    }
    const action = {
      type: 'currentWorkout/decrementCurrentLiftIndex'
    }
    expect(currentWorkoutReducer(initialState_Index_One, action)).toEqual(
      expectedState
    );
  });
  it('should not decrement currentLiftIndex if === 0', () => {
    const expectedState = {
      lifts: [{ name: 'SQUAT', sets: []}],
      currentLiftIndex: 0
    }
    const action = {
      type: 'currentWorkout/decrementCurrentLiftIndex'
    }
    expect(currentWorkoutReducer(initialState_One_Lift, action)).toEqual(
      expectedState
    );
  });
});
