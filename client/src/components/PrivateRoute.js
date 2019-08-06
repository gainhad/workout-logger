import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import "./PrivateRoute.scss";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isLoggedIn = useSelector(state => state.userData.isLoggedIn);
  const authenticationChecked = useSelector(
    state => state.userData.authenticationChecked
  );
  let componentToRender = <AuthenticatingScreen />;
  if (isLoggedIn) {
    componentToRender = <Component {...rest} />;
  } else if (authenticationChecked) {
    componentToRender = <Redirect to="/login" />;
  }
  return <Route {...rest} render={() => componentToRender} />;
};

const AuthenticatingScreen = props => {
  return (
    <div id="authenticating-screen">
      <h1>Authenticating...</h1>
    </div>
  );
};

export default PrivateRoute;
