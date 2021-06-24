import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {ContactsRoutingModule} from './contacts-routing.module';
import {ContactsComponent} from './contacts.component';
import {SharedModule} from '../../shared/shared.module';
import {ContactsCheckComponent} from './modals/contacts-check/contacts-check.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactsRoutingModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  declarations: [ContactsComponent, ContactsCheckComponent]
})
export class ContactsModule {
}
