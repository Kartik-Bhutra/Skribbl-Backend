export default function (gameSettings, rooms, roomID, socket) {
  const room = rooms.get(roomID);
  room.settings = { playerCount: room.settings.playerCount, ...gameSettings };
  socket.broadcast.to(roomID).emit("settings", gameSettings);
}