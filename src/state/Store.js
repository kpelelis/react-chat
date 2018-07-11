import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import rootReducer from "../reducers";

import { networkingMiddleware } from "../networking/Socket";

const INITIAL_STATE = {
  messages: [],
  users: [],
  self: null
};

export function configureStore(initialState = INITIAL_STATE) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, networkingMiddleware)
  );
  window.store = store;
  return store;
}
