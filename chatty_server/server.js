const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 8080
const PORT = 8080;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

let counter = 0;

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Increment the number of people online
  counter++;
  // Broadcast to everyone the number of people online
  wss.broadcast(JSON.stringify({type: "counter", count: counter}))

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    data,id = uuid.v4();

    switch (data.type) {
      case "postMessage":
        data.type = "incomingMessage"
        wss.broadcast(JSON.stringify(data));
      break;

      case "postNotification":
        data.type = "incomingNotification"
        wss.broadcast(JSON.stringify(data));
      break;

      default:
        throw new Error("Unknown event type " + data.type);
    }

  });

  ws.on('close', () => {
      console.log('Client disconnected')
      // Decrement the counter of current users
      counter--;
      //Broadcast the current amount of users online to everyone connected
      wss.broadcast(JSON.stringify({type: "counter", count: counter}))
    });
  });

wss.broadcast = (data) => {
  wss.clients.forEach( function each(client) {
    client.send(data);
  });
};
