import { Component } from '@angular/core';

@Component({
  selector: 'my-card',
  template: `
    <div class="blog-card">
      <div class="meta">
        <div class="photo" style="background-image: url(https://storage.googleapis.com/chydlx/codepen/blog-cards/image-1.jpg)"></div>
        <ul class="details">
          <li class="author"><a href="#">John Doe</a></li>
          <li class="date">Aug. 24, 2015</li>
          <li class="tags">
            <ul>
              <li><a href="#">Learn</a></li>
              <li><a href="#">Code</a></li>
              <li><a href="#">HTML</a></li>
              <li><a href="#">CSS</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="description">
        <h1>Learning to Code</h1>
        <h2>Opening a door to the future</h2>
        <hr>
        <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta.</p>
        <p class="read-more">
          <a href="#">Read More</a>
        </p>
      </div>
    </div>
  `,
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
}
