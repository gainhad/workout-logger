import React from "react";
import { Link } from "react-router-dom";
import styles from "./viewDataMenu.module.scss";
import { useSelector } from "react-redux";
import { getLiftNamesAlphabetized } from "../../redux/slices/liftHistory";
import { getMeasurementTypesAlphabetized } from "../../redux/slices/measurementHistory";

const ViewDataMenu = () => {
  const liftNames = useSelector(state => getLiftNamesAlphabetized(state));
  const measurementNamesAndUnits = useSelector(state =>
    getMeasurementTypesAlphabetized(state)
  );
  return (
    <div id={styles.viewDataMenu}>
      <Link to="/">
        <button type="button" className={styles.backButton}>
          &larr;
        </button>
      </Link>
      <div className={styles.dataSelectionMenu}>
        <h2 className={styles.menuHeader}>LIFTS</h2>
        <ul className={styles.dataSelectionList}>
          {liftNames.map((lift, key) => (
            <li key={key}>
              <Link to={`/view/lift/${lift}`}>
                <button type="button">{lift.toUpperCase()}</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.dataSelectionMenu}>
        <h2 className={styles.menuHeader}>MEASUREMENTS</h2>
        <ul className={styles.dataSelectionList}>
          {measurementNamesAndUnits.map((entry, key) => (
            <li key={key}>
              <Link to={`/view/measurement/${entry.name}`}>
                <button type="button">{entry.name.toUpperCase()}</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button
        type="button"
        className="button-one"
        id={styles.graphMultipleButton}
      >
        <h2>GRAPH MULTIPLE</h2>
      </button>
    </div>
  );
};

export default ViewDataMenu;
