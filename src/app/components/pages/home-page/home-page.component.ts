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
  template: `
    <welcome-banner-section></welcome-banner-section>

    <user-missing-traits-message></user-missing-traits-message>

    <new-jobs-section></new-jobs-section>

    <applications-status-section *ngIf="user"></applications-status-section>

    <how-it-works-section *ngIf="!user"></how-it-works-section>

    <newcomer-pitch-section *ngIf="!user"></newcomer-pitch-section>

    <employer-pitch-section *ngIf="!user"></employer-pitch-section>

    <employer-match-pitch-section *ngIf="!user"></employer-match-pitch-section>

    <requirements-section></requirements-section>

    <partners-section></partners-section>
  `
})
export class HomePageComponent extends PageComponent {

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
