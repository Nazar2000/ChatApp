import {Component, OnInit} from '@angular/core';
import {io} from 'socket.io-client';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  socket;
  message: string;

  constructor() {
  }

  ngOnInit() {
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      console.log(data);
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding =  '15px 30px';
        element.style.margin = '10px';
        document.getElementById('message-list').appendChild(element);
      }
    });
  }

  SendMessage() {
    this.socket.emit('message', this.message);
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    element.style.textAlign = 'right';
    document.getElementById('message-list').appendChild(element);
    this.message = '';
  }
}
