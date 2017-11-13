import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {PageComponent} from '../page.component';
import {PageOptionsService} from '../../../services/page-options.service';
import {RendererFactory2} from '@angular/core';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'user-profile-page',
  template: `
    <div class="ui centered grid">
      <div class="fourteen wide mobile ten wide tablet eight wide computer column">
        <user-notification-settings-form></user-notification-settings-form>
      </div>
    </div>
    `
})
export class UserNotificationSettingsPageComponent extends PageComponent {

  public constructor (
    @Inject(DOCUMENT) protected document: any,
    @Inject(REQUEST) protected request: any,
    protected meta: Meta,
    protected pageOptionsService: PageOptionsService,
    protected rendererFactory: RendererFactory2,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected translateService: TranslateService,
    protected userResolver: UserResolver,
  ) {
    super(
      {
        title: {
          translate: true,
          content: 'meta.user.profile.title'
        },
        description: {
          translate: true,
          content: 'meta.user.profile.description'
        }
      },
      document,
      meta,
      pageOptionsService,
      rendererFactory,
      request,
      systemLanguagesResolver,
      translateService,
      userResolver
    );
  }
}
