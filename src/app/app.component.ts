import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    {title: 'Chats', url: '/folder/chats', icon: 'mail'},
    {title: 'Settings', url: '/folder/settings', icon: 'settings'},
  ];
  public navigationShow = false;

  constructor(private router: Router) {
    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.navigationShow = !(this.router.url === '/login' || this.router.url === '/sign-up');
      }
    });
  }
}
