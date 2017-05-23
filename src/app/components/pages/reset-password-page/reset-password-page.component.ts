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
  template:
  `
  <div class="reset-password-container">
    <basic-border-header
      [header]="'reset.password.title' | translate"
      icon="key">
    </basic-border-header>

    <div class="ui centered grid reset-password-form-container">
      <div class="fourteen wide phone ten wide tablet eight wide computer column">
        <reset-password-form></reset-password-form>
      </div>
    </div>
  </div>`,
  styleUrls: ['./reset-password-page.component.scss']
})
export class ResetPasswordPageComponent extends PageComponent {

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
          content: 'meta.reset.password.title'
        },
        description: {
          translate: true,
          content: 'meta.reset.password.description'
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
