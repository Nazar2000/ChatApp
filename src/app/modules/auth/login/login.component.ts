import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import {GeneralService} from '../../../core/services/generel/general.service';
import {ToastsService} from '../../../core/services/toasts/toasts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isPassHide = false;

  constructor(
    public authService: AuthService,
    public toastsService: ToastsService,
    public generalService: GeneralService,
    private router: Router) {
    this.generalService.authorised = false;
    this.loginForm = new FormGroup({
      telNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.minLength(3)]),
    });
  }

  submitForm() {
    const data: any = {
      telNumber: this.loginForm.controls.telNumber.value,
      // password: this.loginForm.controls.password.value,
        password: 'qwerty123',
    };
    // const data: any = {
    //   telNumber: '0967559525',
    //   password: 'qwerty123',
    // };
    this.authService.logIn(data).subscribe((resp: any) => {
      if (resp.token){
        localStorage.setItem('token', resp.token);
        this.generalService.getUserId();
        this.generalService.authorised = true;
        this.router.navigate(['/chats/']);
      }else {
        this.toastsService.showToast('Your login or password is incorrect', 'danger');
      }
    });
  }
}
