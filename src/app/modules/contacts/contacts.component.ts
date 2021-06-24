import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Contact} from '../../core/interface/phone-contact';
import {Plugins} from '@capacitor/core';
import {GeneralService} from '../../core/services/generel/general.service';
import {ContactsCheckComponent} from './modals/contacts-check/contacts-check.component';
import {MatDialog} from '@angular/material/dialog';
import {ContactsService} from '../../core/services/contacts/contacts.service';
import {Router} from '@angular/router';
import {ToastsService} from '../../core/services/toasts/toasts.service';

const {Contacts} = Plugins;

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: Observable<Contact[]>;

  constructor(
    public generalService: GeneralService,
    private contactService: ContactsService,
    public toastsService: ToastsService,
    public dialog: MatDialog,
    public router: Router,
  ) {
  }

  ngOnInit() {
    this.getPermissions();
    this.getContactsArray();
  }

  getPermissions() {
    Contacts.getPermissions();
  }

  contactChat(contact) {
    const id = contact.telNumber;
    this.router.navigate([`/chats/chat/${id}`]);
  }

  checkContacts() {
    const dialogRef = this.dialog.open(ContactsCheckComponent, {
      height: '250px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getContacts();
    });
  }

  getContactsArray() {
    this.contactService.getContacts(this.generalService.userId).subscribe((resp: any) => {
      if (resp != null) {
        this.contactService.contactsArray = resp.data.contacts;
        this.contacts = of(this.contactService.contactsArray);
      }
    });
  }

  getContacts() {
    Contacts.getContacts().then(result => {
      this.toastsService.showToast('Successfully get!', 'success');

      const phoneContacts = result.contacts;
      const data = {
        telNumbersArray: phoneContacts,
        id: this.generalService.userId
      };
      this.contactService.checkContacts(data).subscribe((resp: any) => {
        if (resp.message) {
          this.toastsService.showToast(resp.message, resp.color);
          this.getContactsArray();
        } else {
          this.contacts = of(resp);
        }
      });
    });
  }
}
