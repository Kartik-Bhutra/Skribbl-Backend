import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import roomIDGenerator from "./generateRoomID.js";

const app = express();
app.use(cors({
    origin: ['http://localhost:3000']
}));
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});

const array = [];

io.on('connection', (socket) => {
    console.log(`a user ${socket.id} connected`);
    socket.on('disconnect', () => console.log(`user ${socket.id} disconnected`));
    socket.on("join", (username) => {
        let roomID = roomIDGenerator();
        if (array.length === 0) {
            array.push({
                roomID,
                users: [username]
            });
        }
        else {
            let flag = false;
            for (let i = 0; i < array.length; i++) {
                if (array[i].users.length < 2) {
                    array[i].users.push(username);
                    roomID = array[i].roomID;
                    flag = true;
                    break;
                }
            }
            if (!flag) {
                array.push({
                    roomID,
                    users: [username]
                });
            }
        }
        console.log(`user ${username} joined room ${roomID}`);
        socket.join(roomID);
        console.log(`user ${socket.id} joined room ${roomID}`);
        io.to(roomID).emit("joined", roomID);
    });
});

const port = process.env.PORT;
server.listen(port, () => console.log(`server is running on port ${port}`));