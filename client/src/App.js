import React from "react";
import Main from "./Main";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import "./style/colors.css";

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
