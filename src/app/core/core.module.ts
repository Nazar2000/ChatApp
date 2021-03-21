import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

/**
 *
 * [CoreModule]:
 * - global/HTTP services (only one instance of those services will be created across the entire app)
 * - important single use components/classes
 * - export any third party module that is required in the AppModule
 *
 * Important note:
 * Import CoreModule ONLY in the main AppModule, not in the Feature Modules.
 */

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [],
  providers: [],
  exports: [
    HttpClientModule,
    RouterModule,
  ]
})
export class CoreModule {
}
