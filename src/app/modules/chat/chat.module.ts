import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {ChatComponent} from './chat.component';
import {ChatRoutingModule} from './chat-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatRoutingModule
  ],
  declarations: [ChatComponent]
})
export class ChatModule {}
