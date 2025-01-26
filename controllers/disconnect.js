export default function (socket, rooms) {
  for (const [roomID, room] of rooms) {
    const updatedPlayers = room.filter((player) => player.socketID !== socket.id);
    if (updatedPlayers.length === 0) {
      rooms.delete(roomID);
      return;
    }
    else if (updatedPlayers.length < room.length) {
      rooms.set(roomID, updatedPlayers);
      socket.broadcast.to(roomID).emit("players", updatedPlayers);
      return;
    }
  }
}
