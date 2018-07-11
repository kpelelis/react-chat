import * as ActionTypes from "../actions/ActionTypes";

export default function messagesReducer(state = [], action) {
  const { type } = action;
  console.log(type, action);
  switch (type) {
    case ActionTypes.RECEIVE_MESSAGE:
    case ActionTypes.LOCAL_SEND_MESSAGE:
      return [
        ...state,
        {
          content: action.message,
          sender: action.user,
          id: state.length
        }
      ];
    default:
      return state;
  }
}
