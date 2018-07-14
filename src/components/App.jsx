/**
 * @flow
 */
import React from "react";
import { connect } from "react-redux";
import { hot } from "react-hot-loader";
import { css } from "glamor";

import UsersSidebar from "./UsersSidebar.jsx";
import Chat from "./Chat.jsx";
import UserInput from "./UserInput.jsx";
import ConnectModal from "./ConnectModal.jsx";

import * as messageActions from "../actions/MessagesActions";
import * as usersActions from "../actions/UsersActions";

import type { User, Message } from "../FlowTypes";

type Props = {
  users: Array<User>,
  messages: Array<Messages>,
  me: User
};

let app = css({
  display: "flex",
  font: "16px/1 Roboto",
  height: "50vh",
  display: "flex",
  justifyContent: "center"
});

let container = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
});

export class App extends React.Component<Props> {
  setDetails = (handle, avatar) => {
    const { setDetails } = this.props;
    setDetails({ handle, avatar });
  };
  render() {
    const { me, users, messages, sendMessage } = this.props;
    return (
      <React.Fragment>
        {!me && (
          <ConnectModal
            active={me === null}
            onRequestConnect={this.setDetails}
          />
        )}
        <div {...app}>
          <UsersSidebar users={users} />
          <div {...container}>
            <Chat messages={messages} me={me} />
            <UserInput onSend={m => me && sendMessage(m, me.handle)} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const select = store => {
  return {
    users: store.users,
    messages: store.messages,
    me: store.self
  };
};

const action = dispatch => {
  return {
    sendMessage: (message, sender) =>
      dispatch(messageActions.sendMessage(message, sender)),
    setDetails: user => dispatch(usersActions.selfConnectThunk(user))
  };
};

const reduxApp = connect(
  select,
  action
)(App);

export default hot(module)(reduxApp);
