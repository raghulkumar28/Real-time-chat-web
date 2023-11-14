const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const app = express(); // Create an express app
const server = http.createServer(app); // Pass the express app to createServer
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

server.listen(port, function () {
  console.log(`Server is listening on ${port}!`);
});
