import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { userDataActions } from "../../redux/slices/userData";
import { globalUIActions } from "../../redux/slices/globalUI";
import styles from "./Login.module.scss";
import ButtonOne from "../../components/ButtonOne";
import Modal from "../../components/Modal";
import LoginForm from "./LoginForm.js";
import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  function onSignIn(googleUser) {
    let idToken = googleUser.getAuthResponse().id_token;
    axios({
      method: "get",
      url: "/api/login",
      headers: { Authorization: "bearer " + idToken }
    })
      .then(res => {
        dispatch(userDataActions.isLoggedIn(res.data.isLoggedIn));
      })
      .then(res => dispatch(globalUIActions.isBlurred(false)));
  }
  function demoSignIn() {
    axios({
      method: "get",
      url: "/api/login",
      headers: { authorization: "bearer 1" }
    })
      .then(res => {
        dispatch(userDataActions.isLoggedIn(res.data.isLoggedIn));
      })
      .then(res => dispatch(globalUIActions.isBlurred(false)));
  }
  function onFailure(response) {
    console.log(response);
  }

  return (
    <div id={styles.loginScreen}>
      <h1>A WORKOUT LOGGER</h1>
      <ButtonOne
        className={styles.button}
        id={styles.loginButton}
        onClick={() => setLoginModalOpen(true)}
      >
        LOGIN
      </ButtonOne>
      <Modal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <LoginForm onSignIn={onSignIn} onFailure={onFailure} />
      </Modal>
      <ButtonOne className={styles.button} onClick={demoSignIn}>
        DEMO
      </ButtonOne>
    </div>
  );
};

export default Login;
