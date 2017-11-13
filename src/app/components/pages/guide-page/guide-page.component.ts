import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {Meta} from '@angular/platform-browser';
import {PageComponent} from '../page.component';
import {PageOptionsService} from '../../../services/page-options.service';
import {RendererFactory2} from '@angular/core';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  styleUrls: ['./guide-page.component.scss'],
  template: `
    <div class="guide">
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
  `
})
export class GuidePageComponent extends PageComponent {

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
          content: 'meta.guide.title'
        },
        description: {
          translate: true,
          content: 'meta.guide.description'
        },
        canonicalUrl: PageComponent.getBaseUrl(request) + JARoutes.guide.url()
      },
      document,
      meta,
      pageOptionsService,
      rendererFactory,
      request,
      systemLanguagesResolver,
      translateService,
      userResolver,
      false,
    );
  }
}
