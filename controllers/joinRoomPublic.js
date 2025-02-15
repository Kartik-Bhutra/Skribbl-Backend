import roomIDGenerator from "../generators/generateRoomID.js";
import nameGenerator from "../generators/generateName.js";

export default async function (socket, username, io, rooms) {
  let roomID = roomIDGenerator();
  while (rooms.has(roomID)) {
    roomID = roomIDGenerator();
  }
  if (!username) {
    username = await nameGenerator();
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
    rooms.set(roomID, { players, settings: { playerCount: 7, drawTime: 60, roundCount: 3 } });
  } else {
    let roomFound = false;
    for (const [existingRoomID, roomData] of rooms) {
      if (roomData.players.length < 7) {
        roomData.players.push({
          name: username,
          socketID: socket.id,
          score: 0,
        });
        players = roomData.players;
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
      rooms.set(roomID, { players, settings: { playerCount: 7, drawTime: 60, roundCount: 3 } });
    }
  }
  socket.join(roomID);
  io.to(roomID).emit("joined", players);
}