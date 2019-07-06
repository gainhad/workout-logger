import React from 'react';
import { connect } from 'react-redux';
import { addLift } from '../actions/currentWorkoutActions';


const LiftLog = props => {
  function selectPreviousLift() {
    if (props.currentLiftIndex < props.lifts.length - 1) {
      props.setCurrentLiftIndex(props.currentLiftIndex + 1);
    }
  }

  function selectNextLift() {
    if (props.currentLiftIndex > 0) {
      props.setCurrentLiftIndex(props.currentLiftIndex - 1);
    }
  }
  return (
    <div id="lift-log">
      <LiftSelector
        atEnd={props.currentLiftIndex === props.lifts.length - 1}
        atBeginning={props.currentLiftIndex === 0}
        currentLift={props.lifts[props.currentLiftIndex]}
        selectPreviousLift={selectPreviousLift}
        selectNextLift={selectNextLift}
        toggleNewLiftModal={props.toggleNewLiftModal}
      />
      <InfoDisplay
        editable={props.liftEditable}
        setEditSetModal={props.setEditSetModal}
        sets={props.lifts[props.currentLiftIndex].sets}
      />
      <button
        type="button"
        id="edit-button"
        onClick={props.toggleEditLiftModal}
      >
        EDIT
      </button>
      <button
        type="button"
        onClick={props.addLift}
        className="arrow-button"
        id="add-set-button"
      >
        &#65291;
      </button>
    </div>
  );
};

const LiftSelector = props => {
  return (
    <div id="lift-selector">
      {!props.atEnd ? (
        <button
          type="button"
          onClick={props.selectPreviousLift}
          className="arrow-button"
        >
          &larr;
        </button>
      ) : null}
      <h2>{props.currentLift.name.toUpperCase()}</h2>
      {props.atBeginning ? (
        <button
          type="button"
          className="arrow-button"
          onClick={props.toggleNewLiftModal}
        >
          &#65291;
        </button>
      ) : (
        <button
          type="button"
          className="arrow-button"
          onClick={props.selectNextLift}
        >
          &rarr;
        </button>
      )}
    </div>
  );
};

const InfoDisplay = props => {
  const setList = props.sets.map((set, index) => (
    <div
      className={props.editable ? 'set editable' : 'set'}
      key={index}
      onClick={() =>
        props.editable
          ? props.setEditSetModal({ display: true, index: index })
          : null
      }
    >
      <div className="set-weight grid-left">
        <b>{set.weight}</b> <span>lbs</span>
      </div>
      <div className="set-reps">
        <b>{set.reps}</b> <span>reps</span>
      </div>
      <div className="set-rpe grid-left">
        <span>@</span> <b>{set.rpe}</b>
      </div>
    </div>
  ));
  return <div id="info-display">{setList}</div>;
};

export default connect(null, { addLift })(LiftLog);
