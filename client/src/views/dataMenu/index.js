import React from "react";
import { Link } from "react-router-dom";
import styles from "./viewDataMenu.module.scss";
import { useSelector } from "react-redux";
import { getLiftNamesAlphabetized } from "../../redux/slices/liftHistory";
import { getMeasurementTypesAlphabetized } from "../../redux/slices/measurementHistory";
import ButtonOne from "../../components/ButtonOne";
import Loader from "../../components/Loader";

const ViewDataMenu = () => {
  const liftNames = useSelector(state => getLiftNamesAlphabetized(state));
  const measurementNamesAndUnits = useSelector(state =>
    getMeasurementTypesAlphabetized(state)
  );
  const liftDataFetching = useSelector(state => state.liftHistory.isFetching);
  const measurementDataFetching = useSelector(
    state => state.measurementHistory.fetchingInProgress
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
        {liftDataFetching ? (
          <Loader />
        ) : (
          <ul className={styles.dataSelectionList}>
            {liftNames.map((lift, key) => (
              <li key={key}>
                <Link to={`/view/lift/${lift}`}>
                  <ButtonOne type="button">{lift.toUpperCase()}</ButtonOne>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.dataSelectionMenu}>
        <h2 className={styles.menuHeader}>MEASUREMENTS</h2>
        {measurementDataFetching ? (
          <Loader />
        ) : (
          <ul className={styles.dataSelectionList}>
            {measurementNamesAndUnits.map((entry, key) => (
              <li key={key}>
                <Link to={`/view/measurement/${entry.name}`}>
                  <ButtonOne type="button">
                    {entry.name.toUpperCase()}
                  </ButtonOne>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ViewDataMenu;
