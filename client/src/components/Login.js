import React from "react";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { clientId } from "../config";
import axios from "axios";

const Login = () => {
  function onSignIn(googleUser) {
    console.log(googleUser.getBasicProfile().getId());
    let idToken = googleUser.getAuthResponse().id_token;
    console.log(idToken);
    axios({
      method: "get",
      url: "/api/user-data/get-user-id",
      headers: { Authorization: "bearer " + idToken }
    }).then(res => console.log(res.data));
  }
  function onFailure(response) {
    console.log(response);
  }

  return (
    <div id="login-screen">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
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
