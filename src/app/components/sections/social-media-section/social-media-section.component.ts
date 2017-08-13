import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'social-media-section',
  styleUrls: ['./social-media-section.component.scss'],
  template: `
    <div class="social-media-container">
      <a
        target="_blank"
        rel="noopener"
        href="https://www.facebook.com/JustArrivedSE">
        <img src="/assets/images/facebook-white.png" class="social-media-icon">
      </a>
      <a
        target="_blank"
        rel="noopener"
        href="https://twitter.com/justarrivedse">
        <img src="/assets/images/twitter-white.png" class="social-media-icon">
      </a>
      <a
        target="_blank"
        rel="noopener"
        href="https://www.instagram.com/justarrivedse/">
        <img src="/assets/images/instagram-white.png" class="social-media-icon">
      </a>
      <a
        target="_blank"
        rel="noopener"
        href="https://www.linkedin.com/company/just-arrived-sweden">
        <img src="/assets/images/linkedin-white.png" class="social-media-icon">
      </a>
      <a
        target="_blank"
        rel="noopener"
        href="https://github.com/justarrived">
        <img src="/assets/images/github-white.png" class="social-media-icon">
      </a>
    </div>`
})
export class SocialMediaSectionComponent extends BaseComponent {

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
