const fs = require("fs");
const http = require("http");
const WebSocket = require("ws");

const server = new http.createServer((req, res) => {});
const ws = new WebSocket.Server({ server });

let users = [];

function sendToAllExcept(payload, user) {
  users.forEach(u => {
    if (u.id !== user.id && u.loggedIn) {
      u.ws.send(JSON.stringify(payload));
    }
  });
}
function parsePayload(sender, payload) {
  switch (payload.type) {
    case "SET_DETAILS":
      users = users.map(user => {
        if (user.id === sender.id) {
          sendToAllExcept(
            {
              type: "USER_CONNECTED",
              user: {
                handle: payload.handle,
                avatar: payload.avatar,
                id: sender.id
              }
            },
            sender
          );
          return {
            ...user,
            handle: payload.handle,
            avatar: payload.avatar,
            loggedIn: true
          };
        } else {
          return user;
        }
      });
      sender.ws.send(
        JSON.stringify({
          type: "USERS_LIST",
          users: users.filter(user => user.loggedIn).map(user => ({
            id: user.id,
            handle: user.handle,
            avatar: user.avatar
          }))
        })
      );
      break;
    default:
      sendToAllExcept(payload, sender);
  }
}

ws.on("connection", ws => {
  const newUser = {
    ws,
    id: users.length,
    loggedIn: false
  };
  users = [...users, newUser];
  ws.on("message", message => {
    const jsonPayload = JSON.parse(message);
    parsePayload(newUser, jsonPayload);
    if (!jsonPayload.type) {
      console.error("Error on payload. No type defined");
    }
  });

  ws.on("close", () => {
    sendToAllExcept(
      {
        type: "USER_DISCONNECTED",
        id: newUser.id
      },
      newUser
    );
    users = users.filter(user => (newUser.id === user.id ? null : user));
    console.warn("Client disconected");
  });
});

server.listen(8080);
