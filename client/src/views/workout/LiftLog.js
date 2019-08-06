import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentLift,
  getCurrentLiftIndex,
  atBeginning,
  atEnd,
  currentWorkoutActions
} from "../../redux/slices/currentWorkout";
import Modal from "../../components/Modal";
import NewSet from "./NewSet";
import SetForm from "./SetForm";
import LiftForm from "./LiftForm";
import ButtonOne from "../../components/ButtonOne";
import Tippy from "../../components/tippy";
import styles from "./liftLog.module.scss";

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

  if (lift) {
    return (
      <>
        <div id={styles.liftLog}>
          <LiftSelector
            atBeginning={atFirstLift}
            atEnd={atLastLift}
            currentLift={lift}
            selectPreviousLift={selectPreviousLift}
            selectNextLift={selectNextLift}
            editable={liftEditable}
            setEditable={setLiftEditable}
            tooltipsVisible={props.tooltipsVisible}
          />
          <InfoDisplay
            editable={liftEditable}
            setEditable={setLiftEditable}
            setEditSetModal={props.setEditSetModal}
            sets={lift.sets}
            tooltipsVisible={props.tooltipsVisible}
          />
          <Tippy content="Add Set" visible={props.tooltipsVisible}>
            <button
              type="button"
              onClick={() => setSetModalOpen(true)}
              className={styles.addButton}
              id={styles.addSetButton}
            >
              &#65291;
            </button>
          </Tippy>
          <ButtonOne
            type="button"
            id={styles.editButton}
            className={liftEditable ? styles.cancelButton : null}
            onClick={() => setLiftEditable(!liftEditable)}
          >
            {liftEditable ? "CANCEL" : "EDIT"}
          </ButtonOne>
        </div>
        <Modal isOpen={setModalOpen} onClose={() => setSetModalOpen(false)}>
          <NewSet />
        </Modal>
      </>
    );
  } else {
    return (
      <div id={styles.liftLog}>
        <LiftSelector empty={true} tooltipsVisible={props.tooltipsVisible} />
      </div>
    );
  }
};

// TODO - Break this off into it's own component.
const LiftSelector = props => {
  const [newLiftModalOpen, setNewLiftModalOpen] = useState(false);
  const currentLiftIndex = useSelector(state => getCurrentLiftIndex(state));
  if (props.empty) {
    return (
      <>
        <div id={styles.liftSelector}>
          <Tippy content="Add Lift" visible={props.tooltipsVisible}>
            <button
              type="button"
              className={styles.addButton}
              id={styles.addFirstLift}
              onClick={() => setNewLiftModalOpen(true)}
            >
              &#65291;
            </button>
          </Tippy>
        </div>
        <Modal
          isOpen={newLiftModalOpen}
          onClose={() => {
            setNewLiftModalOpen(false);
          }}
        >
          <LiftForm liftIndex={NaN} onLiftSubmit />
        </Modal>
      </>
    );
  } else {
    return (
      <div id={styles.liftSelector}>
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
          className={
            props.editable
              ? styles.liftName.concat(" ", styles.editable)
              : styles.liftName
          }
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
          <Tippy content="Add Lift" visible={props.tooltipsVisible}>
            <button
              type="button"
              className={styles.addButton + " " + styles.rightButton}
              onClick={() => setNewLiftModalOpen(true)}
            >
              &#65291;
            </button>
          </Tippy>
        ) : (
          <button
            type="button"
            className={"arrow-button " + styles.rightButton}
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
          <LiftForm
            liftIndex={props.editable ? currentLiftIndex : NaN}
            onLiftSubmit
          />
        </Modal>
      </div>
    );
  }
};

// TODO - Break this off into it's own component.
const InfoDisplay = props => {
  const [editSetModal, setEditSetModal] = useState(false);
  const [editSetIndex, setEditSetIndex] = useState(NaN);
  const setList = props.sets.map((set, index) => (
    <div
      className={
        props.editable ? styles.set.concat(" ", styles.editable) : styles.set
      }
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
      <div className="grid-left">
        <b>{set.weight}</b> <span>lbs</span>
      </div>
      <div>
        <b>{set.reps}</b> <span>reps</span>
      </div>
      <div className="grid-left">
        <span>@</span> <b>{set.rpe}</b>
      </div>
    </div>
  ));
  return (
    <div id={styles.infoDisplay}>
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
