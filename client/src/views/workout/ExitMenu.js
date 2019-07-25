import React from "react";
import { Link } from "react-router-dom";
import styles from "./exitMenu.module.scss";
import ButtonOne from "../../components/ButtonOne";

const ExitMenu = props => {
  return (
    <div id={styles.exitMenu}>
      <p className="modal-message">
        Are you sure you want to exit the workout?{" "}
        <b>The workout data will not be saved.</b>
      </p>
      <ButtonOne
        type="button"
        className="button-one"
        id={styles.cancelExit}
        onClick={props.closeModal}
      >
        CANCEL
      </ButtonOne>
      <Link to="/">
        <ButtonOne
          type="button"
          className="button-one"
          id={styles.confirmExit}
          onClick={props.closeModal}
        >
          EXIT
        </ButtonOne>
      </Link>
    </div>
  );
};

export default ExitMenu;
