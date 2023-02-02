import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/scss/style.scss";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import StatusMessage from "./components/StatusMessage/StatusMessage";
import ActionDialogue from "./components/ActionDialogue/ActionDialogue";

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router>
        <Navbar />
        <App />
        <Footer />
        <StatusMessage />
        <ActionDialogue />
      </Router>
    </Provider>
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
