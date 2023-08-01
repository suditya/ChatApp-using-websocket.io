const express = require('express');
const socket = require("socket.io");
const app = express();
const cors = require('cors');


const port = 8080

app.use(express.static("public"))
// app.use(cors());


const server = app.listen(port, function () {
    console.log("server listening on port " + port)
})

var io = socket(server);

io.on("connection", (socket) => {
    console.log("made socket connection", socket.id)
    // Receives message from the client and sends (emit) it to the client.
    socket.on("message", (data) => {
        io.sockets.emit("message", data)
    });
    // Handles typing event and broadcasts it to all the clients except of sender.
    socket.on('typing', function (data) {
        socket.broadcast.emit('typing', data);
    })
})
