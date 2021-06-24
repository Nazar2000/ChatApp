import {Component} from '@angular/core';
import {GeneralService} from '../../core/services/generel/general.service';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  userName = '';

  constructor(
    public generalService: GeneralService,
    private authService: AuthService,
  ) {
    this.userName = this.generalService.userName;
  }

  changeName(): void {
    const data = {
      id: this.generalService.userId,
      username: this.userName
    };
    this.authService.changeName(data).subscribe((resp: any) => {
      this.generalService.userName = resp.username;
    });
  }
}
