export default function (socket, coordinates, roomID) {
  socket.broadcast.to(roomID).emit("recive_drawing", coordinates);
}