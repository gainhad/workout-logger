import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Workout from "./Workout";
import MeasurementMenu from "./MeasurementMenu";
import SingleDataView from "./SingleDataView";
import ViewDataMenu from "./ViewDataMenu";
import { useSelector, useDispatch } from "react-redux";
import { liftHistoryActions } from "../redux/slices/liftHistory.js";
import { measurementHistoryActions } from "../redux/slices/measurementHistory.js";
import { userDataActions } from "../redux/slices/userData";
import PrivateRoute from "./PrivateRoute";

function Main() {
  const dispatch = useDispatch();
  const authenticationChecked = useSelector(
    state => state.userData.authenticationChecked
  );
  const isLoggedIn = useSelector(state => state.userData.isLoggedIn);
  if (!authenticationChecked) {
    dispatch(userDataActions.checkAuthentication());
  }
  const shouldRender = isLoggedIn && authenticationChecked;
  const measurementHistoryFetched = useSelector(
    state => state.measurementHistory.fetched
  );
  const liftHistoryFetched = useSelector(state => state.liftHistory.fetched);
  if (!liftHistoryFetched && isLoggedIn && authenticationChecked) {
    dispatch(liftHistoryActions.fetchLiftHistory());
  }
  if (!measurementHistoryFetched && isLoggedIn && authenticationChecked) {
    dispatch(measurementHistoryActions.fetchMeasurementHistory());
  }
  const isBlurred = useSelector(state => state.globalUI.isBlurred);
  return (
    <div className={isBlurred ? "blurred" : null} id="App">
      <Router>
        <PrivateRoute path="/" exact component={Dashboard} />
        <Route
          path="/login"
          render={() => (isLoggedIn ? <Redirect to="/" /> : <Login />)}
        />
        <PrivateRoute path="/workout" component={Workout} />
        <PrivateRoute path="/measurement" component={MeasurementMenu} />
        <PrivateRoute path="/view" exact component={ViewDataMenu} />
        <Route path="/view/:dataType/:dataItem" component={SingleDataView} />
      </Router>
    </div>
  );
}

/*
const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(<Component />);
  const isLoggedIn = useSelector(state => state.userData.isLoggedIn);
  const authenticationChecked = useSelector(
    state => state.userData.authenticationChecked
  );
  let componentToRender = <AuthenticatingScreen />;
  if (isLoggedIn) {
    componentToRender = <Component />;
  } else if (authenticationChecked) {
    componentToRender = <Redirect to="/login" />;
  }
  return <Route {...rest} render={() => componentToRender} />;
};

const AuthenticatingScreen = props => {
  return <h1>Authenticating...</h1>;
};
*/
export default Main;
