// src/socket/socketio.js
import { io } from "socket.io-client";
import { useBackendKey } from "../data/backendApi";

const { backendKey } = useBackendKey;

const backendApi = backendKey.value;
// Replace with your server URL
const socket = io(backendApi, {
            transports: ["websocket", "polling"],
            query: { role: "admin" } // tell server this socket is an admin
});

let counter = 1
socket.on("init", (data) => {
    console.log(data)
    let temp = []
    if (data.clicks.length===0) return
    (data.clicks).forEach((data) => {
        temp = [];
        temp.push({
            id: counter++,
            name: data.name,
            delay: (data.delayFromFirstMs / 1000).toFixed(2)
        })
    })
    console.log(temp)
});

export default socket;
