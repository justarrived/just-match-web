import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'partners-section',
  styleUrls: ['./partners-section.component.scss'],
  template: `
    <div class="ui basic padded center aligned segment partners-section-container">
      <basic-title-text
        [text]="'home.partners.title' | translate"
        [underlineBelow]="true"
        fontSize="huge"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="pink"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center">
      </basic-title-text>
      <div class="ui centered grid">
        <div class="ui sixteen wide mobile ten wide tablet eight wide computer column">
          <basic-text
            [text]="'home.partners.description' | translate"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-text>
        </div>
      </div>
      <div class="ui centered grid">
        <a
          class="partners-image-link"
          href="http://antrop.se/">
          <img
            alt="Antrop"
            class="ui tiny image"
            src="/assets/images/antrop-logo2.png">
        </a>
        <a
          class="partners-image-link"
          href="http://universumglobal.com/">
          <img
            alt="Universum"
            class="ui tiny image"
            src="/assets/images/logo-universum.png">
        </a>
        <a
          class="partners-image-link"
          href="https://www.frilansfinans.se/">
          <img
            alt="Frilans Finans"
            class="ui tiny image"
            src="/assets/images/frilans_finans-logo.png">
        </a>
        <a
          class="partners-image-link"
          href="https://janssonnorin.se/">
          <img
            alt="Jansson Norin"
            class="ui tiny image"
            src="/assets/images/jansson_norin-logo.png">
        </a>
        <a
          class="partners-image-link"
          href="http://novasverige.se/">
          <img
            alt="Nova"
            class="ui tiny image"
            src="/assets/images/nova-logo.png">
        </a>
        <a
          class="partners-image-link"
          href="http://bondstreet.se/">
          <img
            alt="Bond Street Film"
            class="ui tiny image"
            src="/assets/images/bond_street_film_sthlm.png">
        </a>
        <a
          class="partners-image-link"
          href="http://halvarsson.se/">
          <img
            alt="Hallvarsson Halvarsson"
            class="ui tiny image"
            src="/assets/images/hallvarsson.jpg">
        </a>
      </div>
    </div>`
})
export class PartnersSectionComponent extends BaseComponent {

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
