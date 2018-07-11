import React from "react";

import { type Message } from "../FlowTypes";

type Props = {
	messages: Array<Message>,
	me: string
};

const renderMessage = (message: Message, self: boolean) => {
	return (
		<div
			key={message.id}
			style={{
				marginTop: "1rem",
				textAlign: self ? "right" : "left",
				flex: "1 1 auto",
				clear: "both"
			}}
		>
			<div style={{ position: "relative", float: self ? "right" : "left" }}>
				<div>{message.sender}</div>
				<div
					style={{
						marginTop: "0.5rem",
						borderRadius: "8px",
						padding: "1rem",
						color: "white",
						background: self ? "#5ddbc0" : "#f38258"
					}}
				>
					{message.content}
				</div>
			</div>
		</div>
	);
};

export default class Chat extends React.Component {
	chatContainerDOM = null;

	scroll() {
		if (this.chatContainerDOM) {
			this.chatContainerDOM.scrollTop = this.chatContainerDOM.scrollHeight;
		}
	}

	componentDidMount() {
		this.scroll();
	}

	componentDidUpdate() {
		this.scroll();
	}

	render() {
		const { messages, me } = this.props;
		return (
			<div
				style={{
					display: "flex",
					flexFlow: "column",
					width: "100%",
					height: "100%"
				}}
			>
				<div
					style={{
						listStyle: "none",
						background: "white",
						padding: "2rem",
						color: "#000028",
						overflowY: "scroll",
						flex: "1 1 90%",
						display: "flex",
						flexDirection: "column"
					}}
					ref={el => (this.chatContainerDOM = el)}
				>
					{messages.map(m => renderMessage(m, m.sender === me.handle))}
				</div>
			</div>
		);
	}
}
