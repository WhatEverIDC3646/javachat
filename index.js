const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
app.use(express.static('public'));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket){
    console.log("new user joined server");
    socket.on("disconnect", function(){
        console.log("user has left the server");
    })
    socket.on("chat message", function(msg){
        console.log("message: " + msg);
        io.emit("chat message", msg);
    })
})

server.listen(3000, function(){
    console.log("listening on port 3000");
})