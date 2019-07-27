import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as Sentry from "@sentry/browser";
import LogRocket from "logrocket";
import * as serviceWorker from "./serviceWorker";

if (process.env.NODE_ENV !== "development") {
  LogRocket.init("fnk4wu/workout-logger");
  Sentry.init({
    dsn: "https://031e68ea22ee4641843c6ff3b4b383b9@sentry.io/1514068"
  });
  LogRocket.getSessionURL(sessionURL => {
    Sentry.configureScope(scope => {
      scope.setExtra("sessionURL", sessionURL);
    });
  });
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
