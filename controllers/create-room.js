import Room from "../models/room-model.js";

const createRoom = (io, socket) => {
  return async ({ nickname }) => {
    const player = {
      nickname,
      socketId: socket.id,
      playerType: "X",
    };
    let room = Room();
    room.players.push(player);
    room.turn = player;
    try {
      room = await room.save();
    } catch (error) {
      socket.emit(
        "server-error",
        "Failed to create the room, Please try again later"
      );
      return;
    }

    const roomId = `${room._id}`;
    socket.join(roomId);
    io.to(roomId).emit("create-room-success", roomId);
  };
};

export default createRoom;
