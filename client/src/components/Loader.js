import React from "react";
import styles from "./Loader.module.scss";

const Loader = props => {
  return (
    <div className={props.className}>
      <div className={styles.ldsEllipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
