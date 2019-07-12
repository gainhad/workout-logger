const percentageTable = [
  {
    rpe: 6.5,
    percentages: [
      0,
      0.878,
      0.85,
      0.824,
      0.799,
      0.774,
      0.751,
      0.723,
      0.694,
      0.667,
      0.64
    ]
  },
  {
    rpe: 7,
    percentages: [
      0,
      0.892,
      0.863,
      0.837,
      0.811,
      0.786,
      0.762,
      0.739,
      0.707,
      0.68,
      0.653
    ]
  },
  {
    rpe: 7.5,
    percentages: [
      0,
      0.907,
      0.878,
      0.85,
      0.824,
      0.799,
      0.774,
      0.751,
      0.723,
      0.694,
      0.667
    ]
  },
  {
    rpe: 8,
    percentages: [
      0,
      0.922,
      0.892,
      0.863,
      0.837,
      0.811,
      0.786,
      0.762,
      0.739,
      0.707,
      0.68
    ]
  },
  {
    rpe: 8.5,
    percentages: [
      0,
      0.939,
      0.907,
      0.878,
      0.85,
      0.824,
      0.799,
      0.774,
      0.751,
      0.723,
      0.694
    ]
  },
  {
    rpe: 9,
    percentages: [
      0,
      0.955,
      0.922,
      0.892,
      0.863,
      0.837,
      0.811,
      0.786,
      0.762,
      0.739,
      0.707
    ]
  },
  {
    rpe: 9.5,
    percentages: [
      0,
      0.978,
      0.939,
      0.907,
      0.878,
      0.85,
      0.824,
      0.799,
      0.774,
      0.751,
      0.723
    ]
  },
  {
    rpe: 10,
    percentages: [
      0,
      0.1,
      0.955,
      0.922,
      0.892,
      0.863,
      0.837,
      0.811,
      0.786,
      0.762,
      0.739
    ]
  }
];

function calculateE1RM(weight, reps, rpe) {
  if (rpe < 6.5 || rpe > 10) {
    throw new RangeError('RPE must be between 6.5 and 10 for E1RM calculation');
  } else if (rpe % 0.5 !== 0) {
    throw new Error(`RPE must be a whole or half number. You sent: ${rpe}`);
  } else if (reps > 12) {
    throw new RangeError('Reps must be less than 12 for an E1RM calculation');
  }
  return Math.round(
    weight / percentageTable.find(e => e.rpe === rpe).percentages[reps]
  );
}

export { calculateE1RM };
