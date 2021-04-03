import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FeatureAContainerComponent} from './feature-a-container.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [FeatureAContainerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: FeatureAContainerComponent
      }
    ])
  ]
})
export class FeatureAModule { }
