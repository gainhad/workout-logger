import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Dashboard from "./views/dashboard";
import Login from "./views/login";
import Workout from "./views/workout";
import MeasurementMenu from "./views/measurement";
import SingleDataView from "./views/singleData";
import ViewDataMenu from "./views/dataMenu";
import { useSelector, useDispatch } from "react-redux";
import { liftHistoryActions } from "./redux/slices/liftHistory.js";
import { measurementHistoryActions } from "./redux/slices/measurementHistory.js";
import { userDataActions } from "./redux/slices/userData";
import PrivateRoute from "./components/PrivateRoute";

function Main() {
  const dispatch = useDispatch();
  const authenticationChecked = useSelector(
    state => state.userData.authenticationChecked
  );

  const isLoggedIn = useSelector(state => state.userData.isLoggedIn);

  if (!authenticationChecked) {
    dispatch(userDataActions.checkAuthentication());
  }
  const measurementHistoryFetched = useSelector(
    state => state.measurementHistory.fetchingSuccess
  );

  const liftHistoryFetched = useSelector(state => state.liftHistory.fetched);

  if (!liftHistoryFetched && isLoggedIn && authenticationChecked) {
    dispatch(liftHistoryActions.fetchLiftHistory());
  }

  if (!measurementHistoryFetched && isLoggedIn && authenticationChecked) {
    dispatch(measurementHistoryActions.fetchMeasurementHistory());
  }

  const isBlurred = useSelector(state => state.globalUI.isBlurred);
  const isDemo = useSelector(state => state.userData.demo);

  return (
    <div className={isBlurred ? "blurred" : null} id="App">
      <Router>
        <PrivateRoute path="/" exact component={Dashboard} />
        <Route
          path="/login"
          render={() => (isLoggedIn ? <Redirect to="/" /> : <Login />)}
        />
        <PrivateRoute
          path="/workout"
          firstWorkout={isDemo}
          component={Workout}
        />
        <PrivateRoute path="/measurement" component={MeasurementMenu} />
        <PrivateRoute path="/view" exact component={ViewDataMenu} />
        <Route path="/view/:dataType/:dataItem" component={SingleDataView} />
      </Router>
    </div>
  );
}

export default Main;
