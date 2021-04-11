import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { LazyLinkStylesDemoComponent } from './demo-components/lazy-link-styles-demo.component';
import { LazyStylesDemoComponent } from './demo-components/lazy-styles-demo.component';
import { GlobalStylesDemoComponent } from './demo-components/global-styles-demo.component';
import {LazyCssDemoComponent} from './lazy-css-demo.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    LazyCssDemoComponent,

    LazyStylesDemoComponent,
    LazyLinkStylesDemoComponent,
    GlobalStylesDemoComponent,

    CardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LazyCssDemoComponent
      }
    ])
  ]
})
export class LazyCssDemoModule { }
