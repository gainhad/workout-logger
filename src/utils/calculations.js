const percentageTable = [
  {
    rpe: 6.5,
    percentages: [0, .878, .85, .824, .799, .774, .751, .723, .694, .667, .64]
  },
  {
    rpe: 7,
    percentages: [0, .892, .863, .837, .811, .786, .762, .739, .707, .680, .653]
  },
  {
    rpe: 7.5,
    percentages: [0, .907, .878, .850, .824, .799, .774, .751, .723, .694, .667]
  },
  {
    rpe: 8,
    percentages: [0, .922, .892, .863, .837, .811, .786, .762, .739, .707, .680]
  },
  {
    rpe: 8.5,
    percentages: [0, .939, .907, .878, .850, .824, .799, .774, .751, .723, .694]
  },
  {
    rpe: 9,
    percentages: [0, .955, .922, .892, .863, .837, .811, .786, .762, .739, .707]
  },
  {
    rpe: 9.5,
    percentages: [0, .978, .939, .907, .878, .850, .824, .799, .774, .751, .723]
  },
  {
    rpe: 10,
    percentages: [0, .100, .955, .922, .892, .863, .837, .811, .786, .762, .739]
  }
];

function calculateE1RM(weight, reps, rpe) {
  if (rpe < 6.5 || rpe > 10) {
    throw new RangeError("RPE must be between 6.5 and 10 for E1RM calculation");
  } else if (rpe % .5 !== 0) {
      throw new Error("RPE must be a whole or half number");
  } else if (reps > 12) {
    throw new RangeError("Reps must be less than 12 for an E1RM calculation");
  }
  return weight / percentageTable.find(e => e.rpe === rpe).percentages[reps];
}

export { calculateE1RM };
