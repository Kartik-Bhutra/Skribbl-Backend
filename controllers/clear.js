export default function (socket, roomID) {
  socket.broadcast.to(roomID).emit("clear");
}