export default function (socket, roomID, fillData) {
  socket.broadcast.to(roomID).emit("fill", fillData);
}