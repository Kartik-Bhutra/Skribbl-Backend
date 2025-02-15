import roomIDGenerator from "../generators/generateRoomID.js";
import nameGenerator from "../generators/generateName.js";
export default function (socket, rooms, username) {
    let roomID = roomIDGenerator();
    while (rooms.has(roomID)) {
        roomID = roomIDGenerator();
    }
    if (!username) {
        username = nameGenerator();
    }
    let data = {
        players: [
            {
                name: username,
                score: 0,
            },
        ],
        settings: {
            playerCount: 7,
            drawTime: 60,
            roundCount: 3,
        },
    }
    rooms.set(roomID, data);
    socket.join(roomID);
    socket.emit("created", roomID, username);
}