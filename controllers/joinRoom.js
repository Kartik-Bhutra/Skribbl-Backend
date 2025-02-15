import nameGenerator from "../generators/generateName.js";

export default function (socket, username, io, rooms, roomID) {
  if (!username) {
    username = nameGenerator();
  }
  const room = rooms.get(roomID);
  if (room) {
    const updatedPlayers = room.players;
    updatedPlayers.push({
      name: username,
      score: 0
    });
    rooms.set(roomID, { ...room, players: updatedPlayers });
    socket.join(roomID);
    io.to(roomID).emit("joined", updatedPlayers);
    socket.broadcast.to(roomID).emit("new_player", username,socket.id);
  }
  else {
    io.to(socket.id).emit("incorrect_id");
  }
}