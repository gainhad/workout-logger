import { ADD_LIFT, ADD_SET } from '../actions/types';

const initialState = {
  lifts: [
    {
      name: 'SQUAT',
      sets: []
    }
  ]
};

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_LIFT:
      let newState = {...state}
      newState.lifts.push( {name: action.name, sets: []});
      return newState;
    default:
      return state;
  }
}
