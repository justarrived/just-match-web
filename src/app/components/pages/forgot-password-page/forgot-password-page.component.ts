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
    [header]="'forgot.password.title' | translate"
    icon="unlock">
  </basic-border-header>

  <div class="ui centered grid forgot-password-form-container">
    <div class="fourteen wide phone ten wide tablet eight wide computer column">
      <forgot-password-form></forgot-password-form>
    </div>
  </div>`,
  styleUrls: ['./forgot-password-page.component.scss'],
})
export class ForgotPasswordPageComponent extends PageComponent {

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
          content: 'meta.forgot.password.title'
        },
        description: {
          translate: true,
          content: 'meta.forgot.password.description'
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
