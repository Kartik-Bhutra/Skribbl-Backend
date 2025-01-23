import { Server } from "socket.io";
import { handleJoinRoom } from "./room.js";

export function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        }
    });

    io.on('connection', (socket) => {
        socket.on("join", (username) => handleJoinRoom(socket, username, io));
    });
}