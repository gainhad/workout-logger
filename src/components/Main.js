import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import Workout from './Workout';
import MeasurementMenu from './MeasurementMenu';
import SingleDataView from './SingleDataView';
import ViewDataMenu from './ViewDataMenu';
import { useSelector } from 'react-redux';

function Main() {
  const isBlurred = useSelector(state => state.globalUI.isBlurred);
  return (
    <div className={isBlurred ? 'blurred' : null} id="App">
      <Router>
        <Route path="/" exact component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/workout" component={Workout} />
        <Route path="/measurement" component={MeasurementMenu} />
        <Route path="/view" exact component={ViewDataMenu} />
        <Route path="/view/:dataType/:dataItem" component={SingleDataView} />
      </Router>
    </div>
  );
}

export default Main;
