import * as usersActions from "../actions/UsersActions";
import * as messagesActions from "../actions/MessagesActions";

let socket;
function getSocket() {
	if (!socket) {
		socket = new WebSocket("ws://192.168.20.250:8080");
		socket.addEventListener("message", event => {
			const jsonPayload = JSON.parse(event.data);
			if (!jsonPayload.type) {
				return;
			}
			store.dispatch(jsonPayload);
		});
	}
	return socket;
}

const sendAsync = data =>
	new Promise((res, rej) => {
		try {
			getSocket().send(data);
			res();
		} catch (e) {
			console.log(e);
			rej();
		}
	});

export function setDetails(user) {
	return sendAsync(
		JSON.stringify({
			type: "SET_DETAILS",
			...user
		})
	);
}

export const networkingMiddleware = store => next => action => {
	if (action.networked) {
		const { networked, ...localAction } = action;
		getSocket().send(JSON.stringify(localAction));
	}
	return next(action);
};
