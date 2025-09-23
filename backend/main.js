// main.js
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
// allow local dev origins (change for production)
app.use(cors());

app.use(express.json());
// app.options('*', cors()) // include before other routes

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true
  }
});

// In-memory state (swap for DB if needed)
const clicks = [];               // array of { name, clientTs, clientIso, serverTs, iso, delayFromFirstMs, clientServerSkewMs }
let firstPressTime = null;       // server timestamp (ms)
let firstPressInfo = null;       // full info for first press

// Admin REST endpoint to fetch logs (useful for page load)
app.get("/admin/logs", (req, res) => {
  res.json({
    serverTime: Date.now(),
    firstPressTime,
    firstPressInfo,
    clicks
  });
});

// Return server time (used by clients to estimate offset)
app.get("/time", (req, res) => {
  res.json({ serverTime: Date.now() });
});

// Reset route
app.post("/reset", (req, res) => {
  clicks.length = 0;
  firstPressTime = null;
  firstPressInfo = null;
  io.to("admins").emit("reset");
  return res.json({ ok: true });
});

// Handle admin socket connections only
io.on("connection", (socket) => {
  const role = socket.handshake.query?.role;
  console.log("socket connected", socket.id, "role:", role);

  if (role === "admin") {
    socket.join("admins");
    // send initial state to admin
    socket.emit("init", {
      serverTime: Date.now(),
      firstPressTime,
      firstPressInfo,
      clicks
    });

    socket.on("disconnect", () => {
      console.log("admin disconnected", socket.id);
    });
  } else {
    // If non-admin accidentally connects, just log and disconnect them.
    console.log("non-admin socket attempted connection, disconnecting:", socket.id);
    socket.disconnect(true);
  }
});

// REST endpoint for clients to POST a click
// body: { name?: string, clientTs: number }
app.post("/click", (req, res) => {
  const { name = "Anonymous", clientTs } = req.body ?? {};

  if (typeof clientTs !== "number") {
    return res.status(400).json({ error: "clientTs (number) required" });
  }


  if (!firstPressTime) {
    firstPressTime = clientTs;
  }
  const delayFromFirst = (clientTs-firstPressTime)/1000;
  const click = {
    name,
    clientTs,
    delayFromFirst,
  };

  // If first press, send a special event with same payload
  clicks.push(click);
  if (!firstPressInfo) {
    firstPressInfo = click;
    io.to("admins").emit("firstPress", click);
    console.log("FIRST PRESS:", click);
  } else {
    // Notify only admins via socket.io
    io.to("admins").emit("clickUpdate", click);
    console.log("click recorded:", click);
  }


  return res.json({ ok: true, clientTs });

});

const PORT = 4000;
server.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
