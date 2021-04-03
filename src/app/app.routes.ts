import {Routes} from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'feature-a',
    loadChildren: () => import('./feature-a/feature-a.module').then(m => m.FeatureAModule)
  }
];
