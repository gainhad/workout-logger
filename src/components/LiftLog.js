import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  getCurrentLift,
  incrementCurrentLiftIndex,
  decrementCurrentLiftIndex,
  atBeginning,
  atEnd
} from '../redux/slices/currentWorkout';

const LiftLog = props => {
  const [liftEditable, setLiftEditable] = useState(false);
  return (
    <div id="lift-log">
      <LiftSelector
        atBeginning={props.atBeginning}
        atEnd={props.atEnd}
        currentLift={props.lift}
        selectPreviousLift={props.selectPreviousLift}
        selectNextLift={props.selectNextLift}
        toggleNewLiftModal={props.toggleNewLiftModal}
      />
      <InfoDisplay
        //editable={liftEditable}
        setEditSetModal={props.setEditSetModal}
        sets={props.lift.sets}
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
        onClick={props.toggleSetModal}
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
          onClick={() => props.selectPreviousLift()}
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
          onClick={() => props.selectNextLift()}
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

const mapStateToProps = state => {
  return {
    lift: getCurrentLift(state),
    atBeginning: atBeginning(state),
    atEnd: atEnd(state)
  };
};

const matchDispatchToProps = {
  selectNextLift: decrementCurrentLiftIndex,
  selectPreviousLift: incrementCurrentLiftIndex
};

export default connect(
  mapStateToProps,
  matchDispatchToProps
)(LiftLog);
