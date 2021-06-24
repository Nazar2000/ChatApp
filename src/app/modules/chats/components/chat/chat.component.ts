import {Component, OnInit} from '@angular/core';
import {io} from 'socket.io-client';
import {environment} from '../../../../../environments/environment';
import {GeneralService} from '../../../../core/services/generel/general.service';
import {ActivatedRoute} from '@angular/router';
import {ToastsService} from "../../../../core/services/toasts/toasts.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  socket;
  message: string;
  data = '';
  recipientNumber;

  constructor(public generalService: GeneralService,
              private route: ActivatedRoute,
              public toastsService: ToastsService,
  ) {
  }

  ngOnInit() {
    this.recipientNumber = this.route.snapshot.paramMap.get('id');
    this.setupSocketConnection();
    this.toastsService.showToast('Дякую, за увагу!!!', 'success');
  }

  setupSocketConnection() {
    const endElementOfView = document.getElementById('end');
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.on('updateChat', (userId, data: any) => {
      if (data) {
        const element = document.createElement('li');
        element.innerHTML = data.id ? data.message : data;
        element.style.padding = '8px';
        element.style.margin = '8px';
        element.style.borderRadius = '8px';
        element.style.background = 'white';
        element.style.height = 'max-content';
        element.style.width = 'max-content';
        element.style.maxWidth = '90%';
        if (+userId === +this.generalService.userId) {
          element.style.alignSelf = 'flex-end';
        }
        document.getElementById('message-list').appendChild(element);
        setTimeout(() => endElementOfView.scrollIntoView(), 0);
      }
    });
    this.socket.on('userName', (data) => {
      this.generalService.recipientName = data;
    });
    this.socket.on('connect', () => {
      this.socket.emit('adduser', {
        id: this.generalService.userId,
        recipientNumber: this.recipientNumber,
        username: this.generalService.userName
      });
    });
  }

  SendMessage(data) {
    const dataChat = {
      id: this.generalService.userId,
      recipientNumber: this.recipientNumber,
      message: data,
      timestamp: Date.now()
    };
    this.socket.emit('sendChat', dataChat);
    this.message = '';
  }
}
