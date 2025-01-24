import { Server } from "socket.io";
import { publicRooms as rooms } from "./assests/dummyPublicRooms.js";
import handleJoinRoom from "./controllers/joinRoom.js";
import handleDisconnect from "./controllers/disconnect.js";

export function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        }
    });

    io.on('connection', (socket) => {
        socket.on("disconnect", () => handleDisconnect(socket.id, rooms));
        socket.on("join", (username) => handleJoinRoom(socket, username, io, rooms));
    });
}