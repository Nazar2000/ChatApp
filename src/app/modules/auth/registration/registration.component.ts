import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import {GeneralService} from '../../../core/services/generel/general.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  registerForm: FormGroup;
  isPassHide = false;

  constructor(
    public authService: AuthService,
    public generalService: GeneralService,
    private router: Router) {
    this.generalService.authorised = false;
    this.registerForm = new FormGroup({
      telNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.minLength(3)]),
      username: new FormControl('', [Validators.minLength(2), Validators.maxLength(10)])
    });
  }

  submitForm() {
    const data: any = {
      telNumber: this.registerForm.controls.telNumber.value,
      password: this.registerForm.controls.password.value,
      username: this.registerForm.controls.username.value
    };
    data.username = this.registerForm.controls.username.value;
    this.authService.signUp(data).subscribe(() => {
      this.router.navigate(['/auth/login']);
    });
  }
}
