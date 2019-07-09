import React from 'react';
import './EditSet.scss';

const EditSet = props => {
  return(
    <div className="edit-set">
      <button type="button" onClick={props.closeModal}>
          CANCEL
      </button>
    </div>
  );
}

export default EditSet;
