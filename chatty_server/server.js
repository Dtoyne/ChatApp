const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('node-uuid');

// Set the port to 5000
const PORT = 5000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
const colours = ['red', 'blue', 'green', 'pink', 'orange', 'purple']
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let counter = 0;

wss.on('connection', (ws) => {
  console.log('Client connected');
  counter += 1;
  wss.broadcast({type: 'counter', count: counter});

  let randColour = colours[getRandomIntInclusive(0, colours.length - 1)]
  ws.send(JSON.stringify({type: 'colour', colour: randColour}))

  ws.on('message', handleMessage);

  ws.on('close', () => {
    console.log('Client disconnected')
    counter -= 1;
    wss.broadcast({type: 'counter', count: counter})
  });
});

wss.broadcast = (data) => {
  console.log("Broadcasting: ", data)
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(data));
  });
  console.log(counter)
};

function handleMessage(message) {
  message = JSON.parse(message);
  console.log("Received message: ", message)
  if(message.type === 'postMessage') {
    message.type = 'incomingMessage';
    message.id = uuid.v4();
  } else if(message.type === 'postNotification') {
    message.type = 'incomingNotification';
    message.id = uuid.v4();
  }
  wss.broadcast(message);
}
