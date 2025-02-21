export default function (players, rooms, roomID, socket) {
  const room = rooms.get(roomID);
  room.settings.playerCount = players;
  socket.broadcast.to(roomID).emit("no_players", players);
}