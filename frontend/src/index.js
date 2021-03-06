import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import { getItems } from "./actions/products.action";

window.store = store;

store.dispatch(getItems());

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,

  document.getElementById("root")
);
