import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

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

io.on('connection', (socket) => {
    console.log(`a user ${socket.id} connected`);
    socket.on('disconnect', () => console.log(`user ${socket.id} disconnected`));
});

const port = process.env.PORT;
server.listen(port, () => console.log(`server is running on port ${port}`));