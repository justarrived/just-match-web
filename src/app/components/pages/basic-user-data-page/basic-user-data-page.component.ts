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
  selector: 'basic-user-data-page',
  template: `
    <basic-tabs>
      <basic-tab [tabTitle]="'Basic'">
        <div class="ui centered grid">
          <div class="fourteen wide mobile ten wide tablet eight wide computer column">
            <basic-user-data-form></basic-user-data-form>
          </div>
        </div>
      </basic-tab>
      <basic-tab [tabTitle]="'user.profile.tab.profile.details.title' | translate">
        <div class="ui centered grid">
          <div class="fourteen wide mobile ten wide tablet eight wide computer column">
            <user-profile-form></user-profile-form>
          </div>
        </div>
      </basic-tab>
      <basic-tab [tabTitle]="'user.profile.tab.personal.details.title' | translate">
        <div class="ui centered grid">
          <div class="fourteen wide mobile ten wide tablet eight wide computer column">
            <basic-user-data-form></basic-user-data-form>
          </div>
        </div>
      </basic-tab>
    </basic-tabs>`
})
export class BasicUserDataPageComponent extends PageComponent {

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
      request,
      systemLanguagesResolver,
      translateService,
      userResolver
    );
  }
}
