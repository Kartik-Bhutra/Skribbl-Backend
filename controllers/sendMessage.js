export default function ( { roomID, name, text }, io) {
  io.to(roomID).emit("recive_message", {
    name,
    text,
  });
}