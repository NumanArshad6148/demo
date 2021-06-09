import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import reportWebVitals from "./reportWebVitals";
import Routes from "./routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoursesTable from "./components/courses/table";
import MovingAverage from "./components/courses/MovingAverage";
// import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <CoursesTable /> */}
      {/* <MovingAverage /> */}
      <Routes />
      <ToastContainer autoClose={3000} hideProgressBar />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
