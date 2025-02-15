export default function (roomID, socket, rooms) {
  const room = rooms.get(roomID);
  const updatedPlayers = room.players.filter((player) => player.id !== socket.id);
  if (updatedPlayers.length > 0) {
    rooms.set(roomID, { ...room, players: updatedPlayers });
    socket.broadcast.to(roomID).emit("leave", socket.id);
  } else {
    rooms.delete(roomID);
  }
};