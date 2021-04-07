import {Component} from '@angular/core';


@Component({
  selector: 'global-styles-demo',
  templateUrl: '../markdown-example.html',
  // tslint:disable-next-line:no-host-metadata-property
  host: {class: 'global-markdown'},
})
export class GlobalStylesDemoComponent {
}
