export default function (socket, message, rooms, io) {
  const room = rooms.find((room) => room.players.some((player) => player.socketID === socket.id));
  if (room) {
    io.to(room.roomID).emit("recive_message", message);
  }
}