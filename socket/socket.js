import { Server } from "socket.io";
import { handleJoinRoom } from "./room.js";

export function initializeSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        }
    });

    io.on('connection', (socket) => {
        console.log(`a user ${socket.id} connected`);

        socket.on('disconnect', () => console.log(`user ${socket.id} disconnected`));

        socket.on("join", (username) => handleJoinRoom(socket, username));
    });
}