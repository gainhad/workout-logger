import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ViewDataMenu.scss';
import { useSelector } from 'react-redux';
import { getLiftNamesAlphabetized } from '../redux/slices/liftHistory';
import { getMeasurementTypesAlphabetized } from '../redux/slices/measurementHistory';

const ViewDataMenu = () => {
  const liftNames = useSelector(state => getLiftNamesAlphabetized(state));
  const measurementNamesAndUnits = useSelector(state =>
    getMeasurementTypesAlphabetized(state)
  );
  return (
    <div id="view-data-menu">
      <Link to="/">
        <button type="button" className="arrow-button upper-left">
          &larr;
        </button>
      </Link>
      <div className="data-selection-menu">
        <h2 className="menu-header">LIFTS</h2>
        <ul id="lift-names" className="data-selection-list">
          {liftNames.map((lift, key) => (
            <li key={key}>
              <Link to={`/view/lift/${lift}`}>
                <button type="button">{lift.toUpperCase()}</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="data-selection-menu">
        <h2 className="menu-header">MEASUREMENTS</h2>
        <ul id="measurement-names" className="data-selection-list">
          {measurementNamesAndUnits.map((entry, key) => (
            <li key={key}>
              <Link to={`/view/measurement/${entry.name}`}>
                <button type="button">{entry.name.toUpperCase()}</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <button type="button" className="button-one" id="graph-multiple-button">
        <h2>GRAPH MULTIPLE</h2>
      </button>
    </div>
  );
};

export default ViewDataMenu;
