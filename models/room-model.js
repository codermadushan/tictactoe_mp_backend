import mongoose from "mongoose";

import playerSchema from "./player-model.js";

const roomSchema = mongoose.Schema({
  players: {
    type: [playerSchema],
    required: true,
  },
  turn: {
    type: playerSchema,
    required: true,
  },
  playerCount: {
    type: Number,
    default: 2,
  },
  maxRounds: {
    type: Number,
    default: 6,
  },
  currentRound: {
    type: Number,
    default: 1,
  },
  turnIndex: {
    type: Number,
    default: 0,
  },
  canJoin: {
    type: Boolean,
    default: true,
  },
});

const Room = mongoose.model("Room", roomSchema);

export default Room;
