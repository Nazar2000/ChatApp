import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Chats', url: '/folder/chats', icon: 'mail' },
    { title: 'Settings', url: '/folder/settings', icon: 'settings' },
  ];
  constructor() {}
}
