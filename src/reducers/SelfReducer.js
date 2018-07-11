import * as ActionTypes from "../actions/ActionTypes";

export default function usersReducer(state = null, action) {
  const { type } = action;
  switch (type) {
    case ActionTypes.SELF_CONNECT:
      return action.user;
    default:
      return state;
  }
}
