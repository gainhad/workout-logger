import React from "react";
import { GoogleLogin } from "react-google-login";
import { clientId } from "../../config";
import styles from "./LoginForm.module.scss";
import ButtonOne from "../../components/ButtonOne";

const LoginForm = props => (
  <div className={styles.form}>
    <div className={styles.message}>
      <p>
        This app is currently in testing and is <b>not taking new users</b>. If
        you would like to try to the app, please use the demo button on the
        previous screen.
      </p>
      <p>
        If you are interested in beta testing the application, please email me
        at{" "}
        <a
          href="mailto:hadley.gaines@gmail.com?subject=Join%20Workout%20Logger%20Beta"
          target="__blank"
        >
          hadley.gaines@gmail.com
        </a>
        . Thank you!
      </p>
    </div>
    <ButtonOne className={styles.button} onClick={props.closeModal}>
      CANCEL
    </ButtonOne>
    <GoogleLogin
      clientId={clientId}
      buttonText="Login"
      className={styles.loginButton}
      onSuccess={props.onSignIn}
      onFailure={props.onFailure}
      cookiePolicy={"single_host_origin"}
    />
  </div>
);
export default LoginForm;
