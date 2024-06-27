# User Chat Simulator HTTP REST API

## How to run
Run `yarn start` to start the server.

## Endpoints and documentation
After running the app, you can check the Swagger documents in http://localhost:3000.

## Chat Websocket
The chat messages are available when requesting connection (socket.io) to http://localhost:3000/app-ui

### Messages
- `startChat`: if at least one user is created, this command will pick a random sentence from a random user every three seconds and emit it to `chatMessage` listeners;
- `stopChat`: stops the current chat;
- `chatMessage`: this is the channel where every message is emitted from the users;