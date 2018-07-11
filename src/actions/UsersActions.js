import * as ActionTypes from "./ActionTypes";

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
