import { Server } from "socket.io";
import handleJoinRoom from "./controllers/joinRoom.js";
import handleRoomLeave from "./controllers/leaveRoom.js";
import handleCreateRoom from "./controllers/createRoom.js";
import handleMessage from "./controllers/sendMessage.js";
import handleUndo from "./controllers/undo.js";
import handleClear from "./controllers/clear.js";
import handleFill from "./controllers/fill.js";
import handlePath from "./controllers/path.js";
import handlePlayerCount from "./controllers/playerCount.js";
import handleGameSettings from "./controllers/gameSettings.js";
import handleStart from "./controllers/start.js";

const privateRooms = new Map();

export default function (server) {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000",
        }
    });
    io.on('connection', (socket) => {
        socket.on("create_room", (name) => handleCreateRoom(socket, privateRooms, name, io));
        socket.on("leave", (roomID) => handleRoomLeave(roomID, socket, privateRooms, io))
        socket.on("join_room", (username, roomID) => handleJoinRoom(socket, username, io, privateRooms, roomID));
        socket.on("send_message", (roomID, name, message) => handleMessage(roomID, name, message, io));
        socket.on("fill", (fillData, roomID) => handleFill(socket, roomID, fillData));
        socket.on("undo", (roomID) => handleUndo(socket, roomID));
        socket.on("path", (pathIdx, pathData, roomID) => handlePath(socket, roomID, pathIdx, pathData));
        socket.on("clear", (roomID) => handleClear(socket, roomID));
        socket.on("players", (players, roomID) => handlePlayerCount(players, privateRooms, roomID, socket));
        socket.on("settings", (gameSettings, roomID) => handleGameSettings(gameSettings, privateRooms, roomID, socket));
        socket.on("start", (roomID) => handleStart(privateRooms, roomID, io));
    });
}