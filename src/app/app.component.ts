import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {GeneralService} from './core/services/generel/general.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    {title: 'Chats', url: '/chats', icon: 'chatbubbles'},
    {title: 'Contacts', url: '/contacts', icon: 'book'},
    {title: 'Settings', url: '/settings', icon: 'settings'},
  ];
  public navigationShow = false;

  constructor(private router: Router, public generalService: GeneralService) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.navigationShow = !(this.router.url === '/login' || this.router.url === '/sign-up');
      }
    });
  }
}
