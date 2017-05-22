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
    [header]="'error.title' | translate"
    icon="exclamation triangle">
  </basic-border-header>
  <div class="ui basic very padded segment">
    <error-message
      [header]="'error.description' | translate"
      icon="warning">
    </error-message>
  </div>`,
})
export class ErrorPageComponent extends PageComponent {

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
          content: 'meta.error.title'
        },
        description: {
          translate: true,
          content: 'meta.error.description'
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
