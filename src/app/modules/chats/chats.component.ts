import {Component, OnInit} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Contact} from '../../phone-contact';
import {Router} from "@angular/router";
import {ContactsService} from "../../core/services/contacts/contacts.service";
import {GeneralService} from "../../core/services/generel/general.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent implements OnInit {
  contacts: Observable<Contact[]>;

  constructor(
    public router: Router,
    public generalService: GeneralService,
    private contactService: ContactsService,
  ) {
  }

  ngOnInit() {
    this.getContactsArray();
  }

  contactChat(contact) {
    const id = contact.telNumber;
    this.router.navigate([`/chats/chat/${id}`]);
  }

  getContactsArray() {
    this.contactService.getContacts(this.generalService.userId).subscribe((resp: any) => {
      this.contactService.contactsArray = resp.data.contacts;
      this.contacts = of(this.contactService.contactsArray);
    });
  }
}
