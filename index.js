import express from "express";
import { createServer } from "http";
import cors from "cors";
import initializeSocket from "./socket.js";

const app = express();
app.use(cors({
    origin: ['http://localhost:3000']
}));

const server = createServer(app);
initializeSocket(server);

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`server is running on port ${port}`));