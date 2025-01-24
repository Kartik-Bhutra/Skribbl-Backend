import roomIDGenerator from "../generators/generateRoomID.js";
export default function (socket, username, io, rooms) {
  let roomID = roomIDGenerator();
  if (rooms.length === 0) {
    rooms.push({
      roomID,
      players: [{
        name: username,
        socketID: socket.id,
        score: 0
      }]
    });
  } else {
    let flag = false;
    for (let i = 0; i < rooms.length; i++) {
      if (rooms[i].players.length < 8) {
        rooms[i].players.push({
          name: username,
          socketID: socket.id,
          score: 0
        });
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
    }
  }
  socket.join(roomID);
  io.to(roomID).emit("joined", roomID);
}