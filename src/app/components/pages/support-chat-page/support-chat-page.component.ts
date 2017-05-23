import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {PageComponent} from '../page.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  styleUrls: ['./support-chat-page.component.scss'],
  template: `
  <basic-border-header
    [header]="'support.chat.page.title' | translate"
    icon="comments">
  </basic-border-header>
  <div class="ui centered grid chat-container">
    <div class="sixteen wide phone twelve wide tablet ten wide computer column">
      <support-chat></support-chat>
    </div>
  </div>
  `
})
export class SupportChatPageComponent extends PageComponent {

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
          content: 'meta.support.chat.title'
        },
        description: {
          translate: true,
          content: 'meta.support.chat.description'
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
