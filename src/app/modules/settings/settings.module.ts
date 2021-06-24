import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../../shared/shared.module';
import {SettingsComponent} from './settings.component';
import {SettingsRoutingModule} from './settings-routing.module';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [SettingsComponent]
})
export class SettingsModule {
}
