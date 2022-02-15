import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import {Socket} from 'socket.io-client';
import Room from '../models/room';
import { NetworkService } from './network.service';


@Injectable({
    providedIn: 'root'
  })
export class RealtimeCom {
  private socket: Socket;
 
  constructor(private network: NetworkService) {
    this.socket = io.connect('http://localhost:30905');
    console.log("connected")
  }

  // EMITTER example
  sendMessage(msg: Room) {
    console.log(msg)
    this.socket.emit('bookingTracker:room', { message: msg });
  }

  checkDates(msg: string[], roomId: string) {
    console.log(msg)
    this.network.getSingleRoom(roomId).then((room: any) => {
      this.socket.emit('room:checkDates', { message: msg, roomId: roomId, room: JSON.stringify(room)});
   })
    
  }

  clearDates() {
    this.socket.emit('room:clearDates');
  }

  // HANDLER example
  onNewMessage() {
    console.log("got msg")
    return new Observable(observer => {
      this.socket.on('room:message', msg => {
        observer.next(msg);
      });
    });
  }
}