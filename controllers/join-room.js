import Room from "../models/room-model.js";

const joinRoom = (io, socket) => {
  return async ({ nickname, roomId }) => {
    let room;
    try {
      room = await Room.findById(roomId);
    } catch (error) {
      socket.emit("server-error", "The room ID that you entered is invalid");
      return;
    }

    if (!room) {
      socket.emit("server-error", "There is no room with this ID");
      return;
    }

    if (!room.canJoin) {
      socket.emit(
        "server-error",
        "This room is already full, Please create another one"
      );
      return;
    }

    const player = {
      nickname,
      socketId: socket.id,
      playerType: "O",
    };
    room.players.push(player);
    room.canJoin = false;

    try {
      room = await room.save();
    } catch (error) {
      socket.emit(
        "server-error",
        "Failed to join the room, Please try again later"
      );
      return;
    }

    socket.join(roomId);
    io.to(roomId).emit("join-room-success", room);
  };
};

export default joinRoom;
