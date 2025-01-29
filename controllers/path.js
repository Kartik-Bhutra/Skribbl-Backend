export default function (socket, roomID, pathIdx, pathData) {
  socket.broadcast.to(roomID).emit("path", pathIdx, pathData);
}