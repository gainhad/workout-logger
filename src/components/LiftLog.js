import React, { useState } from 'react';

const LiftLog = props => {
  const [lifts, setLifts] = useState([
    {
      name: 'deadlift',
      sets: [
        { weight: 90, reps: 5, rpe: 6 },
        { weight: 215, reps: 5, rpe: 7 },
        { weight: 225, reps: 5, rpe: 8 },
        { weight: 225, reps: 5, rpe: 10 }
      ]
    },
    {
      name: 'squat',
      sets: [
        { weight: 230, reps: 5, rpe: 6 },
        { weight: 245, reps: 5, rpe: 7 },
        { weight: 255, reps: 5, rpe: 8 },
        { weight: 255, reps: 5, rpe: 8 }
      ]
    },
    {
      name: 'bench press',
      sets: [
        { weight: 100, reps: 7, rpe: 6 },
        { weight: 115, reps: 7, rpe: 7 },
        { weight: 125, reps: 7, rpe: 8 },
        { weight: 125, reps: 7, rpe: 8 }
      ]
    }
  ]);

  const [currentLiftIndex, setCurrentLiftIndex] = useState(0);

  function selectPreviousLift() {
    if (currentLiftIndex < lifts.length - 1) {
      setCurrentLiftIndex(currentLiftIndex + 1);
    }
  }

  function selectNextLift() {
    if (currentLiftIndex > 0) {
      setCurrentLiftIndex(currentLiftIndex - 1);
    }
  }

  return (
    <div id="lift-log">
      <LiftSelector
        atEnd={currentLiftIndex === lifts.length - 1}
        atBeginning={currentLiftIndex === 0}
        currentLift={lifts[currentLiftIndex]}
        selectPreviousLift={selectPreviousLift}
        selectNextLift={selectNextLift}
      />
      <InfoDisplay sets={lifts[currentLiftIndex].sets} />
      <button type="button" onClick={props.toggleModal} className="arrow-button" id="add-set-button">
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
        <button type="button" className="arrow-button">
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
    <div className="set" key={index}>
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
