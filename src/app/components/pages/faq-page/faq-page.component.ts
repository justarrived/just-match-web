import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {PageComponent} from '../page.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  template: `
  <basic-border-header
    [header]="'faq.title' | translate"
    icon="info circle">
  </basic-border-header>
  <faq-accordion></faq-accordion>
  `
})
export class FaqPageComponent extends PageComponent {

  public constructor (
    @Inject(DOCUMENT) protected document: any,
    protected meta: Meta,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected translateService: TranslateService,
    protected userResolver: UserResolver,
  ) {
    super(
      {
        title: {
          translate: true,
          content: 'meta.faq.title'
        },
        description: {
          translate: true,
          content: 'meta.faq.description'
        }
      },
      document,
      meta,
      systemLanguagesResolver,
      translateService,
      userResolver
    );
  }
}
