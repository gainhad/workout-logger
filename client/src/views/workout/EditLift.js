import React from 'react';
import './EditLift.scss';

const EditLift = props => {
  return (
    <div className="edit-lift">
      <div id="lift-name" onClick={props.changeLiftName}>
          {props.lift.name.toUpperCase()}
      </div>
      <button type="button" onClick={props.toggleModal}>
        CANCEL
      </button>
    </div>
  );
};

export default EditLift;
