`use strict`
require("dotenv").config()
const path= require("path")
const http=require("http")
const bcrypt = require('bcrypt');
const { Users }  = require("./public/UserModel/Index");
const { db } = require("./public/UserModel/Index")
const socketio=require("socket.io")
const bodyParser = require('body-parser'); // Middleware


const formatMessages=require("./model/message")

const{ userJoin,getUsers,userLeave,getRoomUsers }=require("./model/users")

const express=require("express")

const app = express()
const server= http.createServer(app)
const io=socketio(server)

const botname="chat chat bot"
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"public")))
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
  });
app.post("/signup",SignUp)
async function SignUp(req,res){
    try {
        req.body.password = await bcrypt.hash(req.body.password, 4);
        const record = await Users.create(req.body);
        res.status(201).json(record);
      } catch (e) { res.status(403).send('Error Creating User'); }
    
}

io.on("connection", socket =>{
    console.log("New Connection")

    socket.on('joinRoom',({username,room})=>{
        const user=userJoin(socket.id,username,room)
        socket.join(user.room)
      
socket.emit("message",formatMessages(botname,"Hello to chat chat "))

socket.broadcast.to(user.room).emit("message",formatMessages(botname,`${user.username} has joind chat chat`))

io.to(user.room).emit('roomUsers',{
    room:user.room,
    users:getRoomUsers(user.room)
})


    })



socket.on("chatMessage", message =>{
console.log(message)

const user = getUsers(socket.id)
io.to(user.room).emit('message',formatMessages(user.username,message))
})

socket.on("disconnect", () =>{
    const user = userLeave(socket.id)
    if(user){
        io.to(user.room).emit("message",formatMessages(botname,`${user.username} has left the chat`))

        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        })
    }
    
})

})


const PORT = process.env.PORT || 3020
db.sync()
    .then(() => {
server.listen(PORT,()=>{
    console.log(`Hey my friend I am running at port ${PORT}`)
})
})
.catch(console.error);