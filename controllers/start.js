export default function (rooms, roomID, io) {
  io.to(roomID).emit("started");
  const room = rooms.get(roomID);
  const interval = room.settings.drawTime;
  let sec = 0;
  const k = setInterval(() => {
    sec++;
    io.to(roomID).emit("time", sec);
    if (sec == interval) {
      clearInterval(k);
    }
  }, 1000);
}