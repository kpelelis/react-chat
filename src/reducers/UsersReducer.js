import * as ActionTypes from "../actions/ActionTypes";

export default function usersReducer(state = [], action) {
  const { type } = action;
  console.log(type, type === ActionTypes.USER_DISCONNECTED);
  switch (type) {
    case ActionTypes.USER_CONNECTED:
      return [
        ...state,
        {
          ...action.user,
          status: "ONLINE"
        }
      ];
    case ActionTypes.USER_DISCONNECTED:
      return state.map(
        u => (u.id === action.id ? { ...u, status: "OFFLINE" } : u)
      );
    case ActionTypes.USERS_LIST:
      return action.users.map(u => ({ ...u, status: "ONLINE" }));
    default:
      return state;
  }
}
