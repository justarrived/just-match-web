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
  <basic-border-section
    [header]="'page.not.found.error.title' | translate"
    icon="exclamation triangle">
  </basic-border-section>
  <div class="ui basic very padded segment">
    <error-message
      header="{{'page.not.found.error.description' | translate}} 😞"
      icon="warning">
    </error-message>
  </div>`
})
export class NotFoundPageComponent extends PageComponent {

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
          content: 'meta.404.title'
        },
        description: {
          translate: true,
          content: 'meta.404.description'
        }
      },
      document,
      meta,
      pageOptionsService,
      request,
      systemLanguagesResolver,
      translateService,
      userResolver
    );
  }
}
