import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatsComponent} from './chats.component';
import {ChatComponent} from './components/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: ChatsComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsRoutingModule {}
