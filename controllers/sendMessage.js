export default function ({ roomID, name, text }, io) {
  io.to(roomID).emit("recieve", {
    name,
    text,
  });
}