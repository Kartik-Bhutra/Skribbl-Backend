import roomIDGenerator from "../generators/generateRoomID.js";
export default function createroom(socket,rooms,settings){
    let roomID = roomIDGenerator();

    while (rooms.has(roomID)) {
        roomID = roomIDGenerator();
    }
    let data = {
        players: [
            {
                name: "",
                socketID: socket.id,
                score: 0,
            },
        ],
        settings: {
            playerCount: settings.playerCount,
            drawTime: settings.drawTime,
            roundCount: settings.roundCount,
        },
    }
    rooms.set(roomID, data);
    console.log("Room created", roomID,settings);
    socket.join(roomID);
    socket.emit("joined", roomID);
    socket.emit("data", data);
}