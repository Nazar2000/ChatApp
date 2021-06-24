import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth/auth.service';
import {Router} from '@angular/router';
import {GeneralService} from '../../../core/services/generel/general.service';
import {ToastsService} from '../../../core/services/toasts/toasts.service';

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
    public toastsService: ToastsService,
    private router: Router) {
    this.generalService.authorised = false;
    this.registerForm = new FormGroup({
      telNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
      password: new FormControl('', [Validators.minLength(3), Validators.pattern('/^[a-z](?=.*\\d)[a-z\\d]{2,15}$/\n')]),
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
    this.authService.signUp(data).subscribe((resp: any) => {
      if (resp.status === 200){
        this.router.navigate(['/auth/login']);
        this.toastsService.showToast('Successfully created!', 'success');
      }else {
        this.toastsService.showToast('Not created!', 'danger');
      }
    });
  }
}
