import roomIDGenerator from "../generators/generateRoomID.js";
import nameGenerator from "../generators/generateName.js";
export default function (socket, rooms, username, io) {
    let roomID = roomIDGenerator();
    while (rooms.has(roomID)) {
        roomID = roomIDGenerator();
    }
    if (!username) {
        username = nameGenerator(0);
    }
    let data = {
        players: [
            {
                name: username,
                score: 0,
                id: socket.id
            },
        ],
        settings: {
            playerCount: 7,
            drawTime: 80,
            roundCount: 3,
        },
    }
    rooms.set(roomID, data);
    socket.join(roomID);
    io.to(socket.id).emit("created", roomID, username);
}