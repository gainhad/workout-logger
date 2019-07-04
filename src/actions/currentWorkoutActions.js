import { ADD_LIFT, ADD_SET } from './types';

export function addLift() {
  dispatch({
    type: ADD_LIFT,
    data: {
      name: 'test',
      sets: []
    }
  });
}
