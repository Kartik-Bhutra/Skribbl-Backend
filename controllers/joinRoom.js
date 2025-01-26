import roomIDGenerator from "../generators/generateRoomID.js";
export default function (socket, username, io, rooms) {
  let roomID = roomIDGenerator();
  while (rooms.has(roomID)) {
    roomID = roomIDGenerator();
  }
  let players = [];
  if (rooms.size === 0) {
    players = [
      {
        name: username,
        socketID: socket.id,
        score: 0,
      },
    ];
    rooms.set(roomID, players);
  } else {
    let roomFound = false;
    for (const [existingRoomID, roomData] of rooms) {
      if (roomData.length < 7) {
        roomData.push({
          name: username,
          socketID: socket.id,
          score: 0,
        });
        players = roomData;
        roomID = existingRoomID;
        roomFound = true;
        break;
      }
    }
    if (!roomFound) {
      players = [
        {
          name: username,
          socketID: socket.id,
          score: 0,
        },
      ];
      rooms.set(roomID, players);
    }
  }
  socket.join(roomID);
  io.to(roomID).emit("joined", roomID);
  io.to(roomID).emit("players", players);
}