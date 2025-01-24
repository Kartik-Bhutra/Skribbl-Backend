import { Server } from "socket.io";
import { publicRooms as rooms } from "./assests/dummyPublicRooms.js";
import handleJoinRoom from "./controllers/joinRoom.js";
import handleDisconnect from "./controllers/disconnect.js";
import handleMessage from "./controllers/sendMessage.js";

export function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        }
    });

    io.on('connection', (socket) => {
        socket.on("disconnect", () => handleDisconnect(socket.id, rooms, io));
        socket.on("join", (username) => handleJoinRoom(socket, username, io, rooms));
        socket.on("send_message", (message) => handleMessage(socket, message, rooms, io));
    });
}