import * as usersActions from "../actions/UsersActions";
import * as messagesActions from "../actions/MessagesActions";

const socket = new WebSocket("ws://localhost:8080");
socket.addEventListener("open", event => {
	const user = {
		handle: "kostas",
		avatar: "kostas.png"
	};

	socket.send(
		JSON.stringify({
			type: "SET_DETAILS",
			...user
		})
	);
	store.dispatch(usersActions.selfConnect(user));
});

socket.addEventListener("message", event => {
	const jsonPayload = JSON.parse(event.data);
	if (!jsonPayload.type) {
		return;
	}
	store.dispatch(jsonPayload);
});

export const networkingMiddleware = store => next => action => {
	if (action.networked) {
		const { networked, ...localAction } = action;
		socket.send(JSON.stringify(localAction));
	}
	return next(action);
};
