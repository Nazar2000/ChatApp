import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth/auth.service';
import {NavigationEnd, Router} from '@angular/router';
import {GeneralService} from "../../../core/services/generel/general.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isPassHide = false;
  loginPage = true;

  constructor(
    public authService: AuthService,
    public generalService: GeneralService,
    private router: Router) {
    this.loginForm = new FormGroup({
      telNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.minLength(3)]),
      username: new FormControl('', [Validators.minLength(2), Validators.maxLength(10)])
    });
  }

  ngOnInit() {
    this.router.events.subscribe(params => {
      if (params instanceof NavigationEnd) {
        this.loginPage = params.url === '/auth/login';
      }
    });
  }

  submitForm() {
    const data: any = {
      telNumber: this.loginForm.controls.telNumber.value,
      password: this.loginForm.controls.password.value
    };
    if (this.loginPage) {
      this.authService.logIn(data).subscribe((resp: any) => {
        localStorage.setItem('token', resp.token);
        this.generalService.getUserId();
        this.router.navigate(['/chats/']);
      });
    } else {
      data.username = this.loginForm.controls.username.value;
      this.authService.signUp(data).subscribe(resp => {
        this.router.navigate(['/auth/login']);
      });
    }
  }
}
