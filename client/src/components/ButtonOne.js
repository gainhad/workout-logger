import React from "react";
import styles from "./ButtonOne.module.scss";

const ButtonOne = props => (
  <button
    className={props.className + " " + styles.button}
    id={props.id}
    onClick={props.onClick}
  >
    {props.children}
  </button>
);

export default ButtonOne;
