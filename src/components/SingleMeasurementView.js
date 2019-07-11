import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getHistoryForLift } from '../redux/slices/liftHistory';
import './SingleMeasurementView.scss';

const SingleMeasurementView = props => {
  const liftName = props.match.params.dataItem;
  const liftHistory = useSelector(state =>
    getHistoryForLift(state, { liftName: liftName })
  );
  function formatDate(timestamp) {
    let date = new Date(timestamp);
    return date.getMonth() + '/' + date.getDate();
  }
  return (
    <div id="single-measurement-view">
      <Link to="/view">
        <button type="button" className="arrow-button upper-left">
          &larr;
        </button>
      </Link>
      <h1 className="lift-title">{liftName.toUpperCase()} HISTORY</h1>
      {liftHistory.map(entry => (
        <p>{formatDate(entry.timestamp)}</p>
      ))}
    </div>
  );
};

export default SingleMeasurementView;
