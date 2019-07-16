import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
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
      url: "/api/user-data/get-user-id",
      headers: { Authorization: "bearer " + idToken }
    }).then(res => dispatch(userDataActions.userId(res.data.userId)));
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
      <form action="" method="post" encType="multipart/form-data">
        <input type="text" name="username" placeholder="username" />
        <input type="password" name="password" placeholder="password" />
        <Link to="/">
          <button type="button" className="arrow-button">
            &rarr;
          </button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
