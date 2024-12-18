import Room from "../models/room-model.js";

const tapOnCell = (io, socket) => {
  return async ({ roomId, index }) => {
    let room;
    try {
      room = await Room.findById(roomId);
    } catch (error) {
      console.log(error);
      return;
    }

    const choice = room.turn.playerType;
    const turnIndex = room.turnIndex == 0 ? 1 : 0;
    room.turnIndex = turnIndex;
    room.turn = room.players[turnIndex];

    try {
      room = await room.save();
    } catch (error) {
      console.log(error);
      return;
    }

    io.to(roomId).emit("tapped-on-cell", { roomData: room, index, choice });
  };
};

export default tapOnCell;
