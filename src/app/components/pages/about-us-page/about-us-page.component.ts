import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {PageOptionsService} from '../../../services/page-options.service';
import {PageComponent} from '../page.component';
import {REQUEST} from '../../../../express-engine';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  styleUrls: ['./about-us-page.component.scss'],
  template: `
    <welcome-banner-section></welcome-banner-section>

    <div
      class="ui centered grid section-container"
      [style.direction]="systemLanguage.direction">
      <div class="sixteen wide mobile ten wide tablet eight wide computer column">
        <div class="ui basic very padded segment">
          <basic-title-text
            [text]="'section.about_us_statement.body' | translate"
            fontSize="large"
            color="white"
            textAlignmentLtr="center"
            textAlignmentRtl="center"
            fontWeight="light">
          </basic-title-text>
        </div>
      </div>
    </div>

    <two-column-section
      backgroundImageUrl="http://placehold.it/1200x900">

      <basic-title-text
        [text]="'section.about_us_simple_matching.title' | translate"
        fontSize="huge"
        color="pink"
        fontWeight="light">
      </basic-title-text>
      <basic-text
        [text]="'section.about_us_simple_matching.body' | translate"
        fontSize="large"
        color="black"
        fontWeight="light">
      </basic-text>
    </two-column-section>

    <two-column-section
      backgroundImagePlacement='false'
      sectionBackground="primary"
      backgroundImageUrl="http://placehold.it/1200x300">

      <basic-title-text
        [text]="'section.about_us_win_win.title' | translate"
        fontSize="huge"
        color="white"
        fontWeight="light">
      </basic-title-text>
      <basic-text
        [text]="'section.about_us_win_win.body' | translate"
        fontSize="large"
        color="white"
        fontWeight="light">
      </basic-text>
    </two-column-section>

    <div
      class="ui centered grid section-container"
      [style.direction]="systemLanguage.direction">
      <div class="sixteen wide mobile ten wide tablet eight wide computer column">
        <div class="ui basic very padded segment">
          <basic-title-text
            [text]="'section.company_history.title' | translate"
            fontSize="huge"
            color="white"
            fontWeight="light">
          </basic-title-text>
          <basic-text
            [text]="'section.company_history.body_first' | translate"
            fontSize="large"
            color="white"
            fontWeight="light">
          </basic-text>
          <basic-text
            [text]="'section.company_history.body_second' | translate"
            fontSize="large"
            color="white"
            fontWeight="light">
          </basic-text>
        </div>
      </div>
    </div>

    <div
      class="ui centered grid section-container-light"
      [style.direction]="systemLanguage.direction">

      <div class="left aligned doubling four column row">
        <div *ngFor="let contact of contacts" class="column">
          <div class="ui basic padded segment">
            <contact-card
              [imageUrl]="contact.profileUrl"
              [name]="contact.name"
              [title]="contact.title"
              [email]="contact.email"
              [phone]="contact.phone">
            </contact-card>
          </div>
        </div>
      </div>
    </div>

    <partners-section></partners-section>
  `
})
export class AboutUsPageComponent extends PageComponent {
  public contacts: any[] = [{
    name: 'General',
    title: 'First line',
    email: 'hej@justarrived.se',
    phone: '-',
    profileUrl: 'https://justarrived.se/assets/images/profile-pictures/general.png'
  }, {
    name: 'Andreas König',
    title: 'CEO, Co-founder',
    email: 'andreas@justarrived.se',
    phone: '+46 73 386 86 56',
    profileUrl: 'https://justarrived.se/assets/images/profile-pictures/andreas_konig.jpg'
  }, {
    name: 'Jacob Burenstam',
    title: 'CTO, Co-founder',
    email: 'jacob@justarrived.se',
    phone: '-',
    profileUrl: 'https://justarrived.se/assets/images/profile-pictures/jacob_burenstam.jpg'
  }, {
    name: 'Madeleine Körössy',
    title: 'CFO',
    email: 'madeleine.korossy@justarrived.se',
    phone: '-',
    profileUrl: 'https://justarrived.se/assets/images/profile-pictures/general.png'
  }, {
    name: 'Yvonne Dahlberg',
    title: 'CMO',
    email: 'yvonne.dahlberg@justarrived.se',
    phone: '-',
    profileUrl: 'https://justarrived.se/assets/images/profile-pictures/general.png'
  }, {
    name: 'Neven Jugo ',
    title: 'Head of Sales',
    email: 'neven.jugo@justarrived.se',
    phone: '+46 70 932 99 62',
    profileUrl: 'https://justarrived.se/assets/images/profile-pictures/neven_jugo.jpg'
  }, {
    name: 'Per Strängberg',
    title: 'Account Manager',
    email: 'per.strangberg@justarrived.se',
    phone: '+46 73 434 83 59',
    profileUrl: 'https://justarrived.se/assets/images/profile-pictures/per_strangberg.jpg'
  }, {
    name: 'Louise Staffas',
    title: 'Account Manager',
    email: 'louise.staffas@justarrived.se',
    phone: '+46 76 785 58 66',
    profileUrl: 'https://justarrived.se/assets/images/profile-pictures/general.png'
  }, {
    name: 'Lova Westlund',
    title: 'Consultant Manager',
    email: 'lova.westlund@justarrived.se',
    phone: '+46 70 538 33 86',
    profileUrl: 'https://justarrived.se/assets/images/profile-pictures/lova_westlund.jpg'
  }, {
    name: 'Anna Hörmark',
    title: 'Consultant Manager',
    email: 'anna.hornmark@justarrived.se',
    phone: '+46 76 802 59 97',
    profileUrl: 'https://justarrived.se/assets/images/profile-pictures/anna_hornmark.jpg'
  }, {
    name: 'Salam Alhennawi',
    title: 'Recruiter',
    email: 'salam.alhennawi@justarrived.se',
    phone: '+46 73 632 72 06',
    profileUrl: 'https://justarrived.se/assets/images/profile-pictures/salam_alhennawi.jpg'
  }, {
    name: 'Charlene Trowell',
    title: 'Recruiter',
    email: 'charlene.trowell@justarrived.se',
    phone: '+46 76 802 59 97',
    profileUrl: 'https://justarrived.se/assets/images/profile-pictures/general.png'
  }];

  public constructor (
    @Inject(DOCUMENT) protected document: any,
    @Inject(REQUEST) protected request: any,
    protected meta: Meta,
    protected pageOptionsService: PageOptionsService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected translateService: TranslateService,
    protected userResolver: UserResolver,
  ) {
    super(
      {
        title: {
          translate: true,
          content: 'meta.home.title'
        },
        description: {
          translate: true,
          content: 'meta.home.description'
        }
      },
      document,
      meta,
      pageOptionsService,
      request,
      systemLanguagesResolver,
      translateService,
      userResolver,
      true,
    );
  }
}
