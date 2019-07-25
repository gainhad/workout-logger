import React from "react";
import "./E1rmDisplay.scss";
import { connect } from "react-redux";
import { getEstimatedOneRepMax } from "../../redux/slices/currentWorkout";

const E1rmDisplay = props => {
  const weight = Math.round(props.estimatedOneRepMax);
  if (weight) {
    return (
      <div className="e1rm-display">
        <b>E1RM:</b> {weight} lbs
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = state => {
  return {
    estimatedOneRepMax: getEstimatedOneRepMax(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(E1rmDisplay);
