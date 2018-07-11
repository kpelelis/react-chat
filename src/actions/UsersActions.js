import * as ActionTypes from "./ActionTypes";
import { setDetails } from "../networking/Socket";

export const userConnected = user => ({
  type: ActionTypes.USER_CONNECTED,
  user
});

export const userDisconnected = id => ({
  type: ActionTypes.USER_DISCONNECTED,
  id
});

export const selfConnect = user => ({
  type: ActionTypes.SELF_CONNECT,
  user
});

export const clientsList = users => ({
  type: ActionTypes.USERS_LIST,
  users
});

export const selfConnectThunk = user => dispatch => {
  setDetails(user).then(() => dispatch(selfConnect(user)));
};
