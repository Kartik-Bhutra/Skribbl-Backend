import { Server } from "socket.io";
import { publicRooms as rooms } from "./assets/dummyPublicRooms.js";
import handleJoinRoom from "./controllers/joinRoom.js";
import handleRoomLeave from "./controllers/leaveRoom.js";
import handleMessage from "./controllers/sendMessage.js";
import handleDrawing from "./controllers/drawing.js";
import handleDisconnect from "./controllers/disconnect.js";

export default function (server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        }
    });

    io.on('connection', (socket) => {
        socket.on("leave_room", (roomID) => handleRoomLeave(roomID, socket, rooms))
        socket.on("disconnect", () => {
            handleDisconnect(socket, rooms);
        });
        socket.on("join", (username) => handleJoinRoom(socket, username, io, rooms));
        socket.on("send_message", (message) => handleMessage(message, io));
        socket.on("send_drawing", (coordinates, roomID) => handleDrawing(socket, coordinates, roomID));
    });
}