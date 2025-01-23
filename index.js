import express from "express";
import { createServer } from "http";
import cors from "cors";
import { initializeSocket } from "./socket/socket.js";

const app = express();
app.use(cors({
    origin: ['http://localhost:3000']
}));

const server = createServer(app);
initializeSocket(server);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});