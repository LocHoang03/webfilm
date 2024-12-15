const express = require('express');
const app = express();
require('dotenv').config();
const configDb = require('./configs/configdb.js');
const cors = require('cors');
require('./configs/passport.js');

// GOOGLE_CLIENT_ID = 619464605379-1efcid0jf6765jvetdso6guncmv1dtos.apps.googleusercontent.com
// GOOGLE_CLIENT_SECRET= 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

const { createServer } = require('http');
const { Server } = require('socket.io');
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

const port = process.env.PORT || 4000;
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
require('./configs/cronJobs');

const Router = require('./routes/index');
const { errorHandler } = require('./helpers/errorHandler');

configDb();

app.use('/', Router);

app.use(errorHandler);

const userNamespace = io.of('/user');
const adminNamespace = io.of('/admin');

userNamespace.on('connection', (socket) => {
  socket.on('joinRoom', (data) => {
    socket.join(data.roomId);
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    adminNamespace.emit('forceLeave', roomId);
    userNamespace.to(roomId).emit('forceLeave', roomId);
  });

  socket.on('receiveRoom', (data) => {
    adminNamespace.emit('room', data);
  });

  socket.on('chatCustomer', (data) => {
    socket.to(data.roomId).emit('receiveChatCustomer', data);
  });

  socket.on('chatCustomerAdmin', (data) => {
    adminNamespace.emit('receiveChatCustomer', data);
  });

  socket.on('disconnect', () => {});
});

adminNamespace.on('connection', (socket) => {
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  });

  socket.on('deleteRoom', (data) => {
    socket.broadcast.emit('delete-room', data);
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);

    adminNamespace.to(roomId).emit('forceLeave', roomId);
    userNamespace.to(roomId).emit('forceLeave', roomId);
  });

  socket.on('chatCustomer', (data) => {
    // console.log('msg-admin', data);
    // socket.to(data.roomId).emit('receiveChatCustomer', data);
  });

  socket.on('disconnect', () => {});
});

httpServer.listen(port, () => {
  console.log('listening on port ' + port);
});
