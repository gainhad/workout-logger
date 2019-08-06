import React from "react";
import styles from "./E1rmDisplay.module.scss";
import { useSelector } from "react-redux";
import { getEstimatedOneRepMax } from "../../redux/slices/currentWorkout";

const E1rmDisplay = props => {
  const estimatedOneRepMax = useSelector(state => getEstimatedOneRepMax(state));
  const weight = Math.round(estimatedOneRepMax);
  if (weight) {
    return (
      <div className={styles.e1rmDisplay}>
        <b>E1RM:</b> {weight} lbs
      </div>
    );
  } else {
    return null;
  }
};

export default E1rmDisplay;
