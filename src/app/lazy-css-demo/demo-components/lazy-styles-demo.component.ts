import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lazy-styles-demo',
  templateUrl: '../markdown-example.html',
})
export class LazyStylesDemoComponent implements OnInit {
  @Input() position: 'append' | 'prepend' = 'append';
  @Input() strategy: 'prefetch' | 'preload' | undefined = undefined;

  @HostBinding('class') get hostClasses(): string {
    console.log(this.strategy);

    return `lazy${this.strategy ? `-${this.strategy}` : ''}-markdown`;
  }

  ngOnInit(): void {
    const lazyStylesLinkEl = Object.assign(document.createElement('link'), {href: `lazy${this.strategy ? `-${this.strategy}` : ''}-markdown-styles.css`, rel: 'stylesheet'});
    console.log(lazyStylesLinkEl);
    if (this.position === 'append') {
      document.head.append(lazyStylesLinkEl);
    } else {
      document.head.prepend(lazyStylesLinkEl);
    }
  }
}
