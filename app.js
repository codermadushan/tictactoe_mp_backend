import { createServer } from "node:http";

import express from "express";
import { Server } from "socket.io";

import createRoom from "./controllers/create-room.js";
import joinRoom from "./controllers/join-room.js";
import tapOnCell from "./controllers/tap-on-cell.js";
import drawTheGame from "./controllers/draw-the-game.js";
import winTheGame from "./controllers/win-the-game.js";

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on("connect", (socket) => {
  console.log(`A user with id: ${socket.id} is connected`);

  socket.on("create-room", createRoom(io, socket));

  socket.on("join-room", joinRoom(io, socket));

  socket.on("tap-on-cell", tapOnCell(io, socket));

  socket.on("draw-the-game", drawTheGame(io, socket));

  socket.on("win-the-game", winTheGame(io, socket));

  socket.on("disconnect", () => {
    console.log(`The user with id: ${socket.id} is disconnected`);
  });
});

export default server;
