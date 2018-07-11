import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./components/App.jsx";

import * as messageActions from "./actions/MessagesActions";
import * as usersActions from "./actions/UsersActions";

import { configureStore } from "./state/Store";

const store = configureStore();

const root = document.getElementById("root");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
