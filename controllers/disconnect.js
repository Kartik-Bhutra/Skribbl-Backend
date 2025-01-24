export default function (id, rooms) {
  const room = rooms.find((room) => room.players.some((player) => player.socketID === id));
  if (room) {
    room.players = room.players.filter((player) => player.socketID !== id);
  }
}