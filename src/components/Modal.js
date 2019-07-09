import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { globalUIActions } from '../redux/slices/globalUI';

import './Modal.scss';

const Modal = props => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const dispatch = useDispatch();
  const closeModal = () => {
    setIsOpen(false);
    props.registerClose();
    dispatch(globalUIActions.isBlurred(false));
  };

  // Update isOpen when props.isOpen changes.
  useEffect(() =>{
    setIsOpen(props.isOpen);
    if (props.isOpen) {
      dispatch(globalUIActions.isBlurred(true));
    }
  }, [props.isOpen]);

  if (isOpen) {
    return ReactDOM.createPortal(
      <div className="modal" id={props.id}>
        {props.toggleButton && (
          <button type="button" onClick={closeModal} id="close-modal-button">
            X
          </button>
        )}
        {React.cloneElement(props.children, { closeModal: closeModal })}
      </div>,
      document.getElementById('root')
    );
  } else {
    return null;
  }
};

Modal.defaultProps = {
  toggleButton: false
};

export default Modal;
