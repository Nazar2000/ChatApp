import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Contact} from '../../phone-contact';
import {Plugins} from '@capacitor/core';
import {GeneralService} from '../../core/services/generel/general.service';
import {ContactsCheckComponent} from '../chats/modals/contacts-check/contacts-check.component';
import {MatDialog} from '@angular/material/dialog';
import {ContactsService} from '../../core/services/contacts/contacts.service';

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
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    if (!this.generalService.isWeb) {
      this.getPermissions();
    }
    this.getContactsArray();
  }

  getPermissions() {
    Contacts.getPermissions();
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
    const data = {
      id: this.generalService.userId
    };
    this.contactService.getContacts(data).subscribe((resp: any) => {
      this.contactService.contactsArray = resp.data.contacts;
      this.contacts = of(this.contactService.contactsArray);
    });
  }

  getContacts() {
    if (!this.generalService.isWeb) {
      Contacts.getContacts().then(result => {
        const phoneContacts = result.contacts;
        this.contacts = of(phoneContacts);
      });
    } else {
      this.contacts = of(this.contactService.contactsArray);
    }
  }
}
