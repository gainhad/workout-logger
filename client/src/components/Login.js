import React from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { clientId } from "../config";
import { userDataActions } from "../redux/slices/userData";
import "./Login.scss";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  function onSignIn(googleUser) {
    let idToken = googleUser.getAuthResponse().id_token;
    axios({
      method: "get",
      url: "/api/login",
      headers: { Authorization: "bearer " + idToken }
    }).then(res => {
      console.log(res);
      dispatch(userDataActions.isLoggedIn(res.data));
    });
  }
  function onFailure(response) {
    console.log(response);
  }

  return (
    <div id="login-screen">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        className="login-button"
        onSuccess={onSignIn}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Login;
