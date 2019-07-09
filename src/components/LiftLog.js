import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCurrentLift,
  getCurrentLiftIndex,
  atBeginning,
  atEnd,
  currentWorkoutActions
} from '../redux/slices/currentWorkout';
import Modal from './Modal';
import NewSet from './NewSet';
import SetForm from './SetForm';
import LiftForm from './LiftForm';

const LiftLog = props => {
  const [liftEditable, setLiftEditable] = useState(false);
  const lift = useSelector(getCurrentLift);
  const atFirstLift = useSelector(atBeginning);
  const atLastLift = useSelector(atEnd);
  const dispatch = useDispatch();
  const selectPreviousLift = () =>
    dispatch(currentWorkoutActions.incrementCurrentLiftIndex());
  const selectNextLift = () =>
    dispatch(currentWorkoutActions.decrementCurrentLiftIndex());
  const [setModalOpen, setSetModalOpen] = useState(false);

  return (
    <div id="lift-log">
      <LiftSelector
        atBeginning={atFirstLift}
        atEnd={atLastLift}
        currentLift={lift}
        selectPreviousLift={selectPreviousLift}
        selectNextLift={selectNextLift}
        editable={liftEditable}
        setEditable={setLiftEditable}
      />
      <InfoDisplay
        editable={liftEditable}
        setEditable={setLiftEditable}
        setEditSetModal={props.setEditSetModal}
        sets={lift.sets}
      />
      <button
        type="button"
        id="edit-button"
        className={liftEditable ? 'cancel-button' : null}
        onClick={() => setLiftEditable(!liftEditable)}
      >
        {liftEditable ? 'CANCEL' : 'EDIT'}
      </button>
      <button
        type="button"
        onClick={() => setSetModalOpen(true)}
        className="arrow-button"
        id="add-set-button"
      >
        &#65291;
      </button>
      <Modal isOpen={setModalOpen} onClose={() => setSetModalOpen(false)}>
        <NewSet />
      </Modal>
    </div>
  );
};

// TODO - Break this off into it's own component.
const LiftSelector = props => {
  const [newLiftModalOpen, setNewLiftModalOpen] = useState(false);
  const currentLiftIndex = useSelector(state => getCurrentLiftIndex(state));
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
      <h2
        className={props.editable ? 'liftName editable' : 'liftName'}
        onClick={
          props.editable
            ? () => {
                setNewLiftModalOpen(true);
              }
            : null
        }
      >
        {props.currentLift.name.toUpperCase()}
      </h2>
      {props.atBeginning ? (
        <button
          type="button"
          className="arrow-button"
          onClick={() => setNewLiftModalOpen(true)}
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
      <Modal
        isOpen={newLiftModalOpen}
        onClose={() => {
          setNewLiftModalOpen(false);
          props.setEditable(false);
        }}
      >
        <LiftForm liftIndex={props.editable ? currentLiftIndex : NaN} onLiftSubmit />
      </Modal>
    </div>
  );
};

// TODO - Break this off into it's own component.
const InfoDisplay = props => {
  const [editSetModal, setEditSetModal] = useState(false);
  const [editSetIndex, setEditSetIndex] = useState(NaN);
  const setList = props.sets.map((set, index) => (
    <div
      className={props.editable ? 'set editable' : 'set'}
      key={index}
      onClick={
        props.editable
          ? () => {
              setEditSetModal(true);
              setEditSetIndex(index);
            }
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
  return (
    <div id="info-display">
      {setList}
      <Modal
        isOpen={editSetModal}
        onClose={() => {
          setEditSetModal(false);
          props.setEditable(false);
        }}
      >
        <SetForm setIndex={editSetIndex} />
      </Modal>
    </div>
  );
};

export default LiftLog;
