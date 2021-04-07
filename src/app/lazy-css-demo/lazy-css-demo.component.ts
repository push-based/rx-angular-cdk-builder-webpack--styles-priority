import {Component} from '@angular/core';


@Component({
  selector: 'feature-a-container',
  template: `
    <h2 class="feature-a">Lazy CSS demo</h2>
    <p>card outside of MD container</p>
    <div style="max-width: 30%"><my-card></my-card></div>
    <div class="demos-container">
      <div class="demo-wrapper"><p>GLOBAL</p><global-styles-demo></global-styles-demo></div>
      <div class="demo-wrapper"><p>LAZY (prefetch & append)</p><lazy-styles-demo position="append" strategy="prefetch"></lazy-styles-demo></div>
      <div class="demo-wrapper"><p>LAZY (append)</p><lazy-styles-demo position="append"></lazy-styles-demo></div>
    </div>
  `,
  styles: [`
    .demos-container {
      display: flex;
      flex-direction: row;
    }
    .demo-wrapper {
      margin: 8px;
      padding: 8px;
      border: 1px black dashed;
      flex: 1 1 0;
    }

    p {
      color: var(--color);
      font-size: 18px;
      font-family: monospace;
      text-align: center;
      padding: 0;
      margin: 0;
      border-bottom: 1px black dashed;
    }
  `],
})
export class LazyCssDemoComponent {
}
