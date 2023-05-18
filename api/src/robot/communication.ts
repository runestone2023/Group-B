/** 
 * All functionality to communicate with the robot
 */
import * as e from 'express';
import { EventTypes } from '@src/other/classes';


// ** Constants ** //
const port = 8081;
const host = "";

// TODO: Remove either SSE of Websocket
// ** SSE implementation ** //

const http = require("http");

// A map of all connected clients
var clients = new Map<number, e.Response>();

function eventHandler(req: e.Request, res: e.Response) {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Connection', 'keep-alive');

  // Flush the headers to establish SSE with client
  res.flushHeaders(); 

  // Use current time as id for connected clients
  const clientId = Date.now()
  console.log(`${clientId} opened a connection`)

  // Add client to clients so we can access it from outside this function
  clients.set(clientId, res)

  res.on('close', () => {
    console.log(`${clientId} closed their connection`);
    clients.delete(clientId)
    res.end();
  });
}

// Broadcast command to all connected robots
// This is not a good way of doing it as it will not allow for individual commands to multiple robots
function sseSendMessage(event: EventTypes, command: any) {
  clients.forEach((client: any) => {
    // To follow conventions a message is formatted as "data: {message}\n\n"

    // FIXME: Need to send real event type, should the robot move, grab, or switch control mode?
    client.write(`event: ${JSON.stringify(null)}\r\ndata: ${JSON.stringify(command)}\r\n`)
  });
}

const server = http.createServer(eventHandler);
server.listen(port, host, () => {
  console.log(`server running at http://${host}:${port}`);
});


// ** Websocket implementation ** //

// const Websocket = require('ws');
// const wsServer = new Websocket.Server({ port: port });

// wsServer.on('connection', (ws: any) => {
//   console.log('Client connected');

//   // How to handle an incoming message
//   ws.on("message", (msg: string) => {
//     // TODO: Add message handling
//     // msg is a hex string and needs conversion
//     console.log(Buffer.from(msg).toString())
//   });

//   ws.on("close", () => {
//     console.log("Client disconnected")
//   });
// })

// // Broadcast command to all connected robots
// // This is not a good way of doing it and will not allow for individual commands to multiple robots
// function wsSendMessage(command: any) {
//   wsServer.clients.forEach((client: any) => {
//     client.send(`${JSON.stringify(command)}`)
//   });
// }

export default {
    // wsSendMessage,
    sseSendMessage,
    server
}