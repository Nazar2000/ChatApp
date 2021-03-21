import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {ChatsComponent} from './chats.component';
import {ChatsRoutingModule} from './chats-routing.module';
import {ChatComponent} from './components/chat/chat.component';
import {SharedModule} from '../../shared/shared.module';
import {ContactsCheckComponent} from "./modals/contacts-check/contacts-check.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatsRoutingModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [ChatsComponent, ChatComponent, ContactsCheckComponent]
})
export class ChatsModule {
}
