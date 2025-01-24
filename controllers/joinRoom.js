import roomIDGenerator from "../generators/generateRoomID.js";
export default function (socket, username, io, rooms) {
  let roomID = roomIDGenerator();
  let players = [];
  if (rooms.length === 0) {
    rooms.push({
      roomID,
      players: [{
        name: username,
        socketID: socket.id,
        score: 0
      }]
    });
    players = rooms[0].players;
  } else {
    let flag = false;
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].players.length < 7) {
        rooms[i].players.push({
          name: username,
          socketID: socket.id,
          score: 0
        });
        players = rooms[i].players;
        roomID = rooms[i].roomID;
        flag = true;
        break;
      }
    }
    if (!flag) {
      rooms.push({
        roomID,
        players: [{
          name: username,
          socketID: socket.id,
          score: 0
        }]
      });
      players = rooms[rooms.length - 1].players;
    }
  }
  socket.join(roomID);
  io.to(roomID).emit("joined", roomID);
  io.to(roomID).emit("players", players);
}