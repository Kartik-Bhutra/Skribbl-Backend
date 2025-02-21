import nameGenerator from "../generators/generateName.js";

export default function (socket, username, io, rooms, roomID) {
  const room = rooms.get(roomID);
  if (room) {
    if (room.players.length < room.settings.playerCount) {
      const updatedPlayers = room.players;
      if (!username) {
        username = nameGenerator(updatedPlayers.length);
      }
      updatedPlayers.push({
        name: username,
        score: 0,
        id: socket.id
      });
      rooms.set(roomID, { ...room, players: updatedPlayers });
      socket.join(roomID);
      socket.broadcast.to(roomID).emit("players", updatedPlayers);
      const { playerCount, ...settings } = room.settings;
      io.to(socket.id).emit("joined", updatedPlayers, roomID, playerCount, settings);
      socket.broadcast.to(roomID).emit("recieve", "", `${username} has joined the room`);
    }
    else {
      io.to(socket.id).emit("full");
    }
  }
  else {
    io.to(socket.id).emit("incorrect");
  }
}