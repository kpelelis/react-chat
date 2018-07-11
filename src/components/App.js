/**
 * @flow
 */
import React from "react";
import { connect } from "react-redux";

import UsersSidebar from "./UsersSidebar";
import Chat from "./Chat";
import UserInput from "./UserInput";

import * as messageActions from "../actions/MessagesActions";

import type { User, Message } from "../FlowTypes";

type Props = {
	users: Array<User>,
	messages: Array<Messages>,
	me: User
};

export class App extends React.Component<Props> {
	render() {
		const { me, users, messages, sendMessage } = this.props;
		return (
			<div
				style={{
					display: "flex",
					width: "60vw",
					height: "40vh",
					font: "16px/1 Roboto"
				}}
			>
				<UsersSidebar users={users} />
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between"
					}}
				>
					<Chat messages={messages} me={me} />
					<UserInput onSend={m => me && sendMessage(m, me.handle)} />
				</div>
			</div>
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
			dispatch(messageActions.sendMessage(message, sender))
	};
};

export default connect(
	select,
	action
)(App);
