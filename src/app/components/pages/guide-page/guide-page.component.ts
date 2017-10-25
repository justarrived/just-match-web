import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {PageComponent} from '../page.component';
import {PageOptionsService} from '../../../services/page-options.service';
import {REQUEST} from '../../../../express-engine';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  styleUrls: ['./guide-page.component.scss'],
  template: `
    <div class="guide">
      <div class="ui padded basic segment">
        <div
          class="ui tablet computer only grid"
          style="flex-wrap: nowrap;"
          [style.direction]="systemLanguage.direction">
          <container-card
            width="300px">
            <guide-menu></guide-menu>
          </container-card>
          <guide-welcome-card
            style="width: 100%"
            width="100%">
          </guide-welcome-card>
        </div>

        <div class="ui mobile only grid">
          <guide-welcome-card
            style="width: 100%"
            width="100%">
          </guide-welcome-card>
        </div>
      </div>
    </div>
  `
})
export class GuidePageComponent extends PageComponent {

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
          content: 'meta.guide.title'
        },
        description: {
          translate: true,
          content: 'meta.guide.description'
        }
      },
      document,
      meta,
      pageOptionsService,
      request,
      systemLanguagesResolver,
      translateService,
      userResolver,
      false,
    );
  }
}
