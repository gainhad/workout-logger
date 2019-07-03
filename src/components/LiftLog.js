import React from 'react';
import NewSet from './NewSet';
import NewRestTimer from './NewRestTimer';
import NewLift from './NewLift';
import './LiftLog.scss';

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

  function openSetModal() {
    props.setModal({
      id: 'set-modal',
      child: (
        <NewSet
          closeSelf={props.closeModal}
          addSet={props.addSet}
          openRestTimerModal={openRestTimerModal}
        />
      )
    });
  }

  function openRestTimerModal() {
    props.setModal({
      id: 'new-rest-timer-modal',
      child: (
        <NewRestTimer
          startTimer={props.startTimer}
          closeModal={props.closeModal}
        />
      )
    });
  }

  function openNewLiftModal() {
    props.setModal({
      id: 'new-lift-modal',
      child: <NewLift closeModal={props.closeModal} addLift={props.addLift} />
    });
  }

  return (
    <div id="lift-log">
      <LiftSelector
        atEnd={props.currentLiftIndex === props.lifts.length - 1}
        atBeginning={props.currentLiftIndex === 0}
        currentLift={props.lifts[props.currentLiftIndex]}
        selectPreviousLift={selectPreviousLift}
        selectNextLift={selectNextLift}
        openNewLiftModal={openNewLiftModal}
      />
      <InfoDisplay
        liftEditable={props.liftEditable}
        setEditSetModal={props.setEditSetModal}
        sets={props.lifts[props.currentLiftIndex].sets}
      />
      <button
        type="button"
        id="edit-lift"
        onClick={() => props.setLiftEditable(!props.liftEditable)}
      >
        EDIT
      </button>
      <button
        type="button"
        onClick={openSetModal}
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
          onClick={props.openNewLiftModal}
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
      className="set"
      key={index}
      onClick={props.liftEditable ? () => props.setEditSetModal(true) : null}
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

export default LiftLog;
