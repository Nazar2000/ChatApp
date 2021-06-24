import {Component} from '@angular/core';
import {GeneralService} from './core/services/generel/general.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public navigationShow = false;
  public appPages = [
    {title: 'Chats', url: '/chats', icon: 'chatbubbles'},
    {title: 'Contacts', url: '/contacts', icon: 'book'},
    {title: 'Settings', url: '/settings', icon: 'settings'},
  ];

  constructor(public generalService: GeneralService) {
  }
}
