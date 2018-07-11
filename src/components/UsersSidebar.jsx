/**
 * @flow
 */
import React from "react";
import { css } from "glamor";

import { type User } from "../FlowTypes";

type Props = {
	users: Array<User>
};

let userContainerCss = css({
	display: "flex",
	marginBottom: "1rem"
});

let avatarCss = css({
	width: "3rem",
	height: "3rem",
	borderRadius: "50%",
	border: "3px solid #8c8c9e"
});

let userCss = css({
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-between",
	marginLeft: "1rem",
	padding: "0.1rem"
});

let handleCss = {
	fontWeight: "bold"
};

const renderUser = (user: User) => {
	return (
		<li {...userContainerCss} key={user.handle}>
			<img {...avatarCss} src={user.avatar} alt="avatar" />
			<div {...userCss}>
				<div>{user.handle}</div>
				<div
					style={css(
						...{ color: user.status === "ONLINE" ? "#5ddbc0" : "#dddde5" }
					)}
				>
					{user.status.toLowerCase()}
				</div>
			</div>
		</li>
	);
};

const userListCss = css({
	listStyle: "none",
	background: "#c0c0cb",
	padding: "2rem",
	color: "white",
	width: "15rem",
	overflowY: "scroll",
	overflowX: "none"
});

export default class UsersSidebar extends React.Component<Props> {
	render() {
		const { users } = this.props;
		return <ul {...userListCss}>{users.map(renderUser)}</ul>;
	}
}
