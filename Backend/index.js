const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes =require("./routes/userRoutes");
const messageRoute = require("./routes/messageRoute");
const socket = require('socket.io');

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => console.log('Connected!'))
.catch((err)=>{
    console.log(err.message);
});
app.use("/api/auth",userRoutes);
app.use("/api/messages" , messageRoute);

const server = app.listen(process.env.PORT , ()=>{
    console.log(`Server Started on port ${process.env.PORT}`);
});


//socket
const io = socket(server, {
    cors: {
      origin: ["http://localhost:3000"],
      credentials: true
    }
  });

///connection to the socket
global.onlineUsers = new Map();
io.on("connection" ,(socket)=>{
// whenever the user login socket add user
    global.chatSocket = socket;
    socket.on("add-user" , (userId)=>{
        onlineUsers.set(userId , socket.id);
    })

    //the message send the online users and receive a message on that time
      socket.on("send-msg" ,(data , user)=>{
        const sendUserSocket = onlineUsers.get(data.to);
      
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-receive" , data.message,
);
        }
      });
      // socket.on('typing1' , (msg)=>{
      //   io.emit('typing',msg)
      // })

      // socket.on('sendTyping' , (data)=>{
      //   console.log(data.username+'is typing in ' + data.to)
      //   io.to(data.to).emit('typing1',data);
      // })
      // const getUser = (username) => {
      //   return onlineUsers.find((user) => user.username === username);
      // };
      // socket.on("sendNotification", ({ senderName, receiverName }) => {
      //   const receiver = getUser(receiverName);
      //   io.to(receiver.userId).emit("getNotification", {
      //     senderName,
      //   });
      // });
      const getUser = (userId) => {
        return onlineUsers.get(userId);
      };
      
      socket.on("sendNotification", ({ senderName, receiverName }) => {
        const receiver = getUser(receiverName);
        io.to(receiver.userId).emit("getNotification", {
          senderName,
        });
      });
} );