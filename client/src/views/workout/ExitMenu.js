import React from 'react';
import { Link } from 'react-router-dom';
import './ExitMenu.scss';

const ExitMenu = props => {
  return (
    <div id="exit-menu">
      <p className="modal-message">
        Are you sure you want to exit the workout?{' '}
        <b>The workout data will not be saved.</b>
      </p>
      <button
        type="button"
        className="button-one"
        id="cancel-exit"
        onClick={props.closeModal}
      >
        CANCEL
      </button>
      <Link to="/">
        <button
          type="button"
          className="button-one"
          id="confirm-exit"
          onClick={props.closeModal}
        >
          EXIT
        </button>
      </Link>
    </div>
  );
};

export default ExitMenu;
