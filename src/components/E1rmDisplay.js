import React from 'react';
import './E1rmDisplay.scss';
import { calculateE1RM } from '../utils/calculations.js';

const E1rmDisplay = params => {
  const weight = Math.round(calculateE1RM(params.set.weight, params.set.reps, params.set.rpe));
  return(
    <div className="e1rm-display">
      <b>E1RM:</b> {weight} lbs
    </div>
  );
}

export default E1rmDisplay;
