// src/socket/socketio.js
import { io } from "socket.io-client";

// Replace with your server URL
const socket = io("http://localhost:4000", {
            transports: ["websocket", "polling"],
            query: { role: "admin" } // tell server this socket is an admin
        });

export default socket;
