const port= process.env.PORT||8000
const io = require("socket.io")(port, {
  cors: {
    origin: "https://my-messenger-viczdera.vercel.app",
  },
});

//add and remove users
let users = [];
const addUser = (userId, socketId) => {
  //to filter out users
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const getSpecificUser= (userId)=>{
    return users.find(user=>user.userId === userId)
}

const removeUser=(socketId)=>{
    users=users.filter(user=>user.socketId !== socketId)
}


io.on("connection", (socket) => {
  console.log("a user connected, Dera");
  io.emit("welcome", "fellow users");

  //to take user id and socket id from user after every connection
  socket.on("addUser", (userId) => {
      addUser(userId,socket.id)
      io.emit("getUsers", users)
  });

  //send and receive messages

  socket.on("sendMessage",({senderId,receiverId, text})=>{
      const user= getSpecificUser(receiverId);
      io.to(user.socketId).emit("getMessage",{
          senderId,
          text
      })
  })




  socket.on("disconnect",()=>{
    console.log("user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users)
  });
});
