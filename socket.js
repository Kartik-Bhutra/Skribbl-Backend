import { Server } from "socket.io";
import { publicRooms as rooms } from "./assets/dummyPublicRooms.js";
import handleJoinRoom from "./controllers/joinRoom.js";
import handleRoomLeave from "./controllers/leaveRoom.js";
import handleMessage from "./controllers/sendMessage.js";
import handleUndo from "./controllers/undo.js";
import handleClear from "./controllers/clear.js";
import handleFill from "./controllers/fill.js";
import handlePath from "./controllers/path.js";
import handleCreateRoom from "./controllers/create.js";

const privateRooms = new Map();

export default function (server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        }
    });
    io.on('connection', (socket) => {
        socket.on("create_room", (name) => handleCreateRoom(socket, privateRooms));
        socket.on("leave_room", (roomID) => handleRoomLeave(roomID, socket, privateRooms))
        socket.on("join_room", (username, roomID) => handleJoinRoom(socket, username, io, privateRooms, roomID));
        socket.on("send_message", (message) => handleMessage(message, io));
        socket.on("fill", (fillData, roomID) => handleFill(socket, roomID, fillData));
        socket.on("undo", (roomID) => handleUndo(socket, roomID));
        socket.on("path", (pathIdx, pathData, roomID) => handlePath(socket, roomID, pathIdx, pathData));
        socket.on("clear", (roomID) => handleClear(socket, roomID));
    });
}