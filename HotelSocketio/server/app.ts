import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';


//Laad alle variabelen van de .env omgeving.
import dotenv from 'dotenv';
import { SocketController } from './controller/socketcontroller';
dotenv.config();

const port = process.env.PORT || 3010;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  const mySocketController = new SocketController(io, socket);

  console.log('new socket connection');
  console.log(`# of clients ${io.engine.clientsCount}`);

  socket.on('disconnect', (reason) => {

    mySocketController.clearDates(socket.id)
    console.log('socket is disconnecting');
    console.log(`# of clients ${io.engine.clientsCount}`);
  });



  socket.on('bookingTracker:newBooking', mySocketController.newBooking);
  socket.on('bookingTracker:booking', mySocketController.getBookingInformation);
  socket.on('bookingTracker:room', mySocketController.getRoomInformation);
  socket.on('room:checkDates', mySocketController.checkDates);
  socket.on('room:clearDates', mySocketController.clearDates);

  io.engine.on('connection_error', (err: any) => {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    console.log(err.context); // some additional error context
  });
});

httpServer.listen(port, () => {
  console.info(`\nExpress Server \nIs on 🔥  http://localhost:${port}/`);
});
