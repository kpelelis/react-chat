import * as ActionTypes from "./ActionTypes";

export const localSendMessage = (message, user) => ({
  type: ActionTypes.LOCAL_SEND_MESSAGE,
  message,
  user,
  networked: true
});

export const receiveMessage = (message, user) => ({
  type: ActionTypes.RECEIVE_MESSAGE,
  message,
  user
});

export const sendMessage = (message, user) => dispatch => {
  dispatch(localSendMessage(message, user));
};
