import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {PageComponent} from '../page.component';
import {REQUEST} from '../../../../express-engine';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  template: `
    <welcome-header></welcome-header>

    <user-missing-traits-message></user-missing-traits-message>

    <new-jobs-section></new-jobs-section>

    <applications-status-section *ngIf="user"></applications-status-section>

    <how-it-works-section *ngIf="!user"></how-it-works-section>

    <requirements-section></requirements-section>

    <partners-section></partners-section>
  `
})
export class HomePageComponent extends PageComponent {

  public constructor (
    @Inject(DOCUMENT) protected document: any,
    @Inject(REQUEST) protected request: any,
    protected meta: Meta,
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
      request,
      systemLanguagesResolver,
      translateService,
      userResolver
    );
  }
}
