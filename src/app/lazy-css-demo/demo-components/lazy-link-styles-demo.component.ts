import {Component} from '@angular/core';
import { LazyLinkService } from '../lazy-link.service';

@Component({
  selector: 'lazy-link-styles-demo',
  templateUrl: '../markdown-example.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {class: 'lazy-link-markdown'},
})
export class LazyLinkStylesDemoComponent {
  constructor(lazyLink: LazyLinkService) {
    lazyLink.loadLink('lazy-markdown-styles');
  }
}
