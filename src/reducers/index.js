import { combineReducers } from "redux";

import messagesReducer from "./MessagesReducer";
import usersReducer from "./UsersReducer";
import selfReducer from "./SelfReducer";

export default combineReducers({
  messages: messagesReducer,
  users: usersReducer,
  self: selfReducer
});
