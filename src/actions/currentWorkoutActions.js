import { ADD_LIFT, ADD_SET } from './types';

export function addLift() {
  return function(dispatch) {
    dispatch({
      type: ADD_LIFT
    });
  }
};

