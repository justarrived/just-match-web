import {Component} from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'default-footer',
  styleUrls: ['./default-footer.component.scss'],
  template: `
      <div class="footer-container ui stackable grid">
        <div
          class="footer-name left aligned three wide column">
          <a
            href="https://justarrived.se">
            {{'applications.title' | translate}}
          </a>
        </div>
        <div
          class="footer-address center aligned ten wide column">
          <a
            href="https://www.google.se/maps/place/Birger+Jarlsgatan+57C,+113+56+Stockholm/@59.3415145,18.0622277,17z/data=!3m1!4b1!4m5!3m4!1s0x465f9d684ea80717:0xe518a0937ab3f86c!8m2!3d59.3415145!4d18.0644164">
            Birger Jarlsgatan 57C, 113 56 Stockholm
          </a>
        </div>
        <div
          class="footer-mail right aligned three wide column"
          href="mailto:hej@justarrived.se">
          <a href="mailto:hej@justarrived.se">
            hej@justarrived.se
          </a>
        </div>
      </div>`
})
export class DefaultFooterComponent {}
