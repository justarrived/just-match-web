import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {PageComponent} from '../page.component';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'user-profile-page',
  template: `
    <user-profile-header></user-profile-header>

    <basic-tabs>
      <basic-tab [tabTitle]="'user.profile.tab.profile.details.title' | translate">
        <div class="ui centered grid">
          <div class="fourteen wide phone ten wide tablet eight wide computer column">
            <user-profile-form></user-profile-form>
          </div>
        </div>
      </basic-tab>
      <basic-tab [tabTitle]="'user.profile.tab.personal.details.title' | translate">
        <div class="ui centered grid">
          <div class="fourteen wide phone ten wide tablet eight wide computer column">
            <user-details-form></user-details-form>
          </div>
        </div>
      </basic-tab>
    </basic-tabs>`
})
export class UserProfilePageComponent extends PageComponent {

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
          content: 'meta.user.profile.title'
        },
        description: {
          translate: true,
          content: 'meta.user.profile.description'
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
