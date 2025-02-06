import express from "express";
import { createServer } from "http";
import cors from "cors";
import initializeSocket from "./socket.js";
import initializeDB from "./DB.js";

const app = express();
app.use(cors({
    origin: ['http://localhost:3000']
}));

const server = createServer(app);
initializeSocket(server);

const port = process.env.PORT || 4000;

initializeDB().then(() => {
    server.listen(port, () => console.log(`Server running on port ${port}`));
}).catch((err) => {
    console.error("Server startup failed due to DB connection error:", err);
});
