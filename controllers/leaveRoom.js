export default function (roomID, socket, rooms, io) {
  const room = rooms.get(roomID);
  const admin = room.players[0].id;
  const leftPlayer = room.players.find((player) => player.id === socket.id);
  const updatedPlayers = room.players.filter((player) => player.id !== socket.id);
  if (updatedPlayers.length > 0) {
    rooms.set(roomID, { ...room, players: updatedPlayers });
    socket.broadcast.to(roomID).emit("players", updatedPlayers);
    socket.broadcast.to(roomID).emit("recieve", "", `${leftPlayer.name} has left the room`);
    if (admin === leftPlayer.id) {
      io.to(roomID).emit("recieve", "", `Room Admin is ${updatedPlayers[0].name}`);
    }
  } else {
    rooms.delete(roomID);
  }
};