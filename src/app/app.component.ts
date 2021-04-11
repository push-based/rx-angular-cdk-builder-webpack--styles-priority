import { Component } from '@angular/core';
import { LazyLinkService } from './lazy-css-demo/lazy-link.service';

@Component({
  selector: 'app-root',
  template: `
  <h1>App Shell</h1>
  <ul>
    <li>
      <a routerLink="feature-a">Feature A (router level lazy loading)</a>
    </li>
    <li><a routerLink="lazy-css-demo">Lazy CSS demo</a></li>
  </ul>
  <router-outlet></router-outlet>
  `,
  styles: [`
    /* @Todo Example */
  `]
})
export class AppComponent {
  constructor(lazyLink: LazyLinkService) {
    lazyLink.registerPrefetchLinks();
  }
}
