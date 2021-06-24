import {Component, OnInit} from '@angular/core';
import {ContactsService} from '../../../../core/services/contacts/contacts.service';
import {MatDialogRef} from '@angular/material/dialog';
import {GeneralService} from '../../../../core/services/generel/general.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contacts-check',
  templateUrl: './contacts-check.component.html',
  styleUrls: ['./contacts-check.component.scss'],
})
export class ContactsCheckComponent implements OnInit {
  checkContactGroup: FormGroup;

  constructor(
    private contactService: ContactsService,
    public dialogRef: MatDialogRef<ContactsCheckComponent>,
    public generalService: GeneralService,
  ) {
    this.checkContactGroup = new FormGroup({
      telNumber: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
    });
  }

  ngOnInit() {
  }

  checkContact(): void {
    const data = {
      telNumber: this.checkContactGroup.controls.telNumber.value
    };
    this.contactService.checkContact(data).subscribe((resp: any) => {
      if (resp.data.length){
        const contacts = {
          id: this.generalService.userId,
          username: resp.data[0].username,
          telNumber: resp.data[0].telNumber
        };
        this.contactService.updateContactList(contacts).subscribe((response: any) => {
          if (typeof response.data !== 'string' && response.data.length){
            this.contactService.contactsArray.push(contacts);
            this.dialogRef.close();
          }
        });
      }
    });
  }
}
