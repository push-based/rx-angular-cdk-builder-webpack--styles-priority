import {Routes} from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'feature-a',
    loadChildren: () => import('./feature-a/feature-a.module').then(m => m.FeatureAModule)
  }, {
    path: 'lazy-css-demo',
    loadChildren: () => import('./lazy-css-demo/lazy-css-demo.module').then(m => m.LazyCssDemoModule)
  }
];
