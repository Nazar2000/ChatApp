import {Component, OnInit} from '@angular/core';
import {io} from 'socket.io-client';
import {environment} from '../../../../../environments/environment';
import {GeneralService} from '../../../../core/services/generel/general.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  socket;
  message: string;
  data = '';

  constructor(public generalService: GeneralService,) {
  }

  ngOnInit() {
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('updateChat', (username, data: string) => {
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding = '15px 30px';
        element.style.margin = '10px';
        if (username === this.generalService.userName){
          element.style.textAlign = 'right';
        }
        document.getElementById('message-list').appendChild(element);
      }
    });

    this.socket.on('connect', () => {
      this.socket.emit('adduser', this.generalService.userName);
    });

    // this.socket.on('updateRooms', (rooms, currentRoom) => {
    //   // document.getElementById('#rooms').empty();
    //   rooms.forEach((key, value) => {
    //     if (value == currentRoom) {
    //       document.getElementById('rooms').append('<div>' + value + '</div>');
    //     } else {
    //       // $('#rooms').append('<div><a href="#" onclick="switchRoom(\'' + value + '\')">' + value + '</a></div>');
    //     }
    //   });
    // });

  }

  SendMessage(data) {
    this.socket.emit('sendChat', data);
    this.message = '';
  }
}
