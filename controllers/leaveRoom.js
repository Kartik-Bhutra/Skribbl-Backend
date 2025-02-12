export default function (roomID, socket, rooms, roomType) {
  const room = rooms.get(roomID);
  const updatedPlayers = room.filter((player) => player.socketID !== socket.id);
  if (updatedPlayers.length > 0) {
    rooms.set(roomID, updatedPlayers);
    socket.broadcast.to(roomID).emit("players", updatedPlayers);
  } else {
    rooms.delete(roomID);
  }
};