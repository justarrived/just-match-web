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
    <div class="ui padded basic segment">
      <div class="ui two column centered grid">
        <div class="ui tablet computer only six wide tablet four wide computer column">
          <container-card
            width="100%">
            <guide-navigation></guide-navigation>
          </container-card>
        </div>
        <div class="ui sixteen wide mobile ten wide tablet seven wide computer column">
          <guide-card
            fadedTitle="Innan du söker jobb"
            title="Myndigheter som är bra att ha koll på">
          </guide-card>
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
