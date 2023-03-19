const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes =require("./routes/userRoutes");
const messageRoute = require("./routes/messageRoute");
const { Socket } = require("socket.io");


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
