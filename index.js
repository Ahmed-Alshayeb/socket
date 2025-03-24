import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json());

app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "*" },
});

// REST API
app.get("/", (req, res) => res.json({ msg: "App is running! 🚀" }));

// Real-time communication
io.on("connection", (client) => {
  console.log(`new user connected: ${client.id}`);

  client.on("msg", (data) => {
    console.log(`new message: ${data.msg}`);
  });

  io.emit("res", "Hello from server!");
});

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
