import React, { useState } from 'react';

import './Modal.scss';

const Modal = props => {
  return (
    <div className="modal" id={props.id}>
      {props.toggleButton && (
        <button type="button" onClick={props.toggle} id="close-modal-button">
          X
        </button>
      )}
      {props.children}
    </div>
  );
};

Modal.defaultProps = {
  toggleButton: true
};

export default Modal;
