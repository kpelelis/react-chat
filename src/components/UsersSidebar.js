/**
 * @flow
 */
import React from "react";

import { type User } from "../FlowTypes";

type Props = {
	users: Array<User>
};

const renderUser = (user: User) => {
	return (
		<li key={user.handle} style={{ display: "flex", marginBottom: "1rem" }}>
			<img
				style={{
					width: "3rem",
					height: "3rem",
					borderRadius: "50%",
					border: "3px solid #8c8c9e"
				}}
				src={user.avatar}
				alt="avatar"
			/>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					marginLeft: "1rem",
					padding: "0.1rem"
				}}
			>
				<div style={{ fontWeight: "bold" }}>{user.handle}</div>
				<div
					style={{ color: user.status === "ONLINE" ? "#5ddbc0" : "#dddde5" }}
				>
					{user.status.toLowerCase()}
				</div>
			</div>
		</li>
	);
};

export default class UsersSidebar extends React.Component<Props> {
	render() {
		const { users } = this.props;
		console.log(users);
		return (
			<ul
				style={{
					listStyle: "none",
					background: "#c0c0cb",
					padding: "2rem",
					color: "white",
					overflowY: "scroll",
					overflowX: "none"
				}}
			>
				{users.map(renderUser)}
			</ul>
		);
	}
}
