import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import reducers from "./reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import "bootstrap/dist/css/bootstrap.min.css";
import AppRouter from "./components/AppRouter";

const sagaMiddleware = createSagaMiddleware();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://mithril-rem.fly.dev/api";

const store = createStore(reducers, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
