import {Component} from '@angular/core';

@Component({
  selector: 'partners-section',
  styleUrls: ['./partners-section.component.scss'],
  template: `
    <div class="ui basic very padded center aligned segment">
      <basic-title-text
        [text]="'home.partners.title' | translate"
        [underlineBelow]="true"
        fontSize="large"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="pink"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center">
      </basic-title-text>
      <basic-text
        [text]="'home.partners.description' | translate"
        textAlignmentLtr="center"
        textAlignmentRtl="center">
      </basic-text>
      <div class="ui centered grid">
        <a
          class="partners-imgae-link"
          href="http://antrop.se/">
          <img
            alt="Antrop"
            class="ui tiny image"
            src="/assets/images/antrop-logo2.png">
        </a>
        <a
          class="partners-imgae-link"
          href="http://universumglobal.com/">
          <img
            alt="Universum"
            class="ui tiny image"
            src="/assets/images/logo-universum.png">
        </a>
        <a
          class="partners-imgae-link"
          href="https://www.frilansfinans.se/">
          <img
            alt="Frilans Finans"
            class="ui tiny image"
            src="/assets/images/frilans_finans-logo.png">
        </a>
        <a
          class="partners-imgae-link"
          href="https://janssonnorin.se/">
          <img
            alt="Jansson Norin"
            class="ui tiny image"
            src="/assets/images/jansson_norin-logo.png">
        </a>
        <a
          class="partners-imgae-link"
          href="http://novasverige.se/">
          <img
            alt="Nova"
            class="ui tiny image"
            src="/assets/images/nova-logo.png">
        </a>
        <a
          class="partners-imgae-link"
          href="http://bondstreet.se/">
          <img
            alt="Bond Street Film"
            class="ui tiny image"
            src="/assets/images/bond_street_film_sthlm.png">
        </a>
        <a
          class="partners-imgae-link"
          href="http://halvarsson.se/">
          <img
            alt="Hallvarsson Halvarsson"
            class="ui tiny image"
            src="/assets/images/hallvarsson.jpg">
        </a>
      </div>
    </div>`
})
export class PartnersSectionComponent {}
