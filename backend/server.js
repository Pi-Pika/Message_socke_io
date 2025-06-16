const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

io.on("connection", (socket) => {
    console.log("User connected with socket ID:", socket.id);
    socket.on("send-message", (message, room)=> {
        if(room === ""){
            socket.broadcast.emit("receive-message", message);
        }else{
            socket.to(room).emit("receive-message", message);
        }
    })
    socket.on("join-room", (room, cb) => {
        socket.join(room);
        cb(`Joined ${room} Succesfully!`);
    })
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
