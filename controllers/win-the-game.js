import Room from "../models/room-model.js";

const winTheGame = (io, socket) => {
  return async ({ roomId, winner }) => {
    let room;
    try {
      room = await Room.findById(roomId);
    } catch (error) {
      console.log(error);
      return;
    }

    const player0 = room.players[0];
    const player1 = room.players[1];
    if (player0.playerType == winner) {
      room.players[0].points = room.players[0].points + 1;
      winner = player0.nickname;
    } else {
      room.players[1].points = room.players[1].points + 1;
      winner = player1.nickname;
    }

    if (room.currentRound >= 6) {
      let message = "Game over, ";
      if (player0.points == player1.points) {
        message += "The game ends without a winner";
      } else if (player0.points > player1.points) {
        message += `${player0.nickname} wins the series`;
      } else {
        message += `${player1.nickname} wins the series`;
      }
      io.to(roomId).emit("end-game", { room, message });
      return;
    }

    room.currentRound = room.currentRound + 1;

    try {
      room = await room.save();
    } catch (error) {
      console.log(error);
      return;
    }

    io.to(roomId).emit("win-game", { room, message: `${winner} won` });
  };
};

export default winTheGame;
