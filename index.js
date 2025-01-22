import express from "express";
import { createServer } from "http";

const app = express();
const server = createServer(app);

const port = process.env.PORT;
server.listen(port, () => console.log(`server is running on port ${port}`));