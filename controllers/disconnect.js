export default function (id, rooms, io) {
  const room = rooms.find((room) => room.players.some((player) => player.socketID === id));
  if (room) {
    room.players = room.players.filter((player) => player.socketID !== id);
    if (room.players.length === 0) {
      rooms = rooms.filter((r) => r.roomID !== room.roomID);
    }
    else {
      io.to(room.roomID).emit("joined", room.players);
    }
  }
}