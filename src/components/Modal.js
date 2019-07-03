import React from 'react';

import './Modal.scss';

const Modal = props => {
  if (props.showModal) {
    return (
      <div className="modal" id={props.id}>
        {props.children}
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
