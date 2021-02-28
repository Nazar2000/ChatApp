import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Contact} from '../../../phone-contact';
import {Plugins} from '@capacitor/core';

const {Contacts} = Plugins;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isPassHide = false;
  contacts: Observable<Contact[]>;

  constructor() {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.minLength(3),
        Validators.maxLength(30), Validators.email]),
      password: new FormControl('', [Validators.minLength(3)])
    });
  }

  ngOnInit() {
    this.getPermissions();
  }

  getPermissions() {
    Contacts.getPermissions();
  }

  async getContacts(): Promise<void> {
    Contacts.getContacts().then(result => {
      const phoneContacts = result.contacts;
      this.contacts = of(phoneContacts);
    });
  }
}
