// let express = require('express')
// let app = express();

// let http = require('http');
// let server = http.Server(app);

// let socketIO = require('socket.io');
// var io = socketIO(server);

// const port = process.env.PORT || 3000;

// server.listen(port, () => {
//     console.log(`started on port: ${port}`);
// });

// io.on('connection', function (socket) {
//     console.log('user connected');

//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });

//     socket.on('join', function (data) {
//       socket.join(data.userid);
//     });

//     socket.on('new-message', function (data) {
//       io.to(data.receiverid).emit('new-msg', {msg: data.msg, senderid: data.senderid, receiverid: data.receiverid});
//       console.log(data.senderid);
//     });
// });




const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
      origin: "http://localhost:4200"
    }
  });
io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('joinNotifications', (params) => {
      socket.join(Number(params.sender))
      console.log("joinNotifications userid:", params.sender);
    })

    socket.on('sendNotifications', (request) => {
      console.log(request)
      socket.to(Number(request.notification_receiver)).emit('recieveNotifications', request)
    })
  
      socket.on('join', function (data) {
        socket.join(data.userid);
        console.log("userid:", data.userid);
      });
  
      socket.on('new-message', function (data) {
        console.log("recieverid:",data.receiverid)
        to=Number(data.receiverid) 
        socket.to(to).emit('new-message', {msg: data.msg, senderid: data.senderid, receiverid: data.receiverid});
        console.log(data.msg);
      });
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});