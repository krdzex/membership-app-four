import config from "./config/config";
import app from "./express";
import mongoose from "mongoose";
import { Server } from "socket.io";

mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on("error", () => {
    throw new Error("Unable to connect to database:" + mongoUri)
})
const allRooms = []

const server = app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("Server started on port: " + config.port)
})



const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});

io.on('connection', (socket) => {

    socket.on("join_dashboard", (data) => {
        socket.join("playersRoom")
        io.to("playersRoom").emit("allRooms", allRooms)
    })
    socket.on("make_room", data => {
        data["playerOneScore"] = 0
        data["playerTwoScore"] = 0
        allRooms.push(data)

        io.to("playersRoom").emit("roomIsMade", allRooms)
        socket.join(data.roomId)
    })
    socket.on("join_game", data => {
        for (let i = 0; i < allRooms.length; i++) {
            if (allRooms[i].roomId === data.roomId) {
                allRooms[i].playerTwo = data.playerTwo
                io.to(allRooms[i].roomId).emit("otherPlayerJoined", allRooms[i])
            }
        }
        socket.join(data.roomId)
    })

    socket.on("startGame", data => {
        for (let i = 0; i < allRooms.length; i++) {
            if (allRooms[i].roomId === data.roomId) {
                io.to(allRooms[i].roomId).emit("playersInfo", allRooms[i])
            }
        }

    })

    socket.on("playerOneWon", data => {
        for (let i = 0; i < allRooms.length; i++) {
            if (allRooms[i].roomId === data.roomId) {
                allRooms[i].playerOneScore += 0.5
                io.to(allRooms[i].roomId).emit("playerScored", allRooms[i])
            }
        }
    })
    socket.on("playerTwoWon", data => {
        for (let i = 0; i < allRooms.length; i++) {
            if (allRooms[i].roomId === data.roomId) {
                allRooms[i].playerTwoScore += 0.5
                io.to(allRooms[i].roomId).emit("playerScored", allRooms[i])
            }
        }
    })

    socket.on("newGame", data => {

        for (let i = 0; i < allRooms.length; i++) {
            if (allRooms[i].roomId === data.roomId) {
                allRooms[i].playerOneChoice = ""
                allRooms[i].playerTwoChoice = ""
                console.log(allRooms[i])
                io.to(allRooms[i].roomId).emit("newGameStarted", allRooms[i])
            }
        }
    })

    socket.on("deleteRoom", data => {
       
        for (let i = 0; i < allRooms.length; i++) {
            if (allRooms[i].roomId === data.roomId) {     
                allRooms.splice(i, 1);
            }
        }
    })

    socket.on("playerPick", data => {
        for (let i = 0; i < allRooms.length; i++) {
            if (allRooms[i].playerOne === data.player && allRooms[i].roomId === data.roomId) {
                allRooms[i].playerOneChoice = data.choice
                io.to(data.roomId).emit("playerPicked", allRooms[i])
            } else {
                if (allRooms[i].playerTwo === data.player) {
                    allRooms[i].playerTwoChoice = data.choice
                    io.to(data.roomId).emit("playerPicked", allRooms[i])
                }
            }
        }
    })


    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
    });
});

