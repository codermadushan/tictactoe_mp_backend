import mongoose from "mongoose";

const playerSchema = mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  socketId: {
    type: String,
    required: true,
  },
  playerType: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
});

export default playerSchema;
