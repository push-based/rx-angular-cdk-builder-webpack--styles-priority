import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';
import * as STYLES from './lazy.styles';
import {RXA_LAZY_STYLES} from './lazy-styles.token';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' })
  ],
  providers: [
    {
      provide: RXA_LAZY_STYLES,
      useValue: STYLES
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
