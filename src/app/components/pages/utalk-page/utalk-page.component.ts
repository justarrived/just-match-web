import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {PageOptionsService} from '../../../services/page-options.service';
import {RendererFactory2} from '@angular/core';
import {PageComponent} from '../page.component';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  template: `
  <utalk-section></utalk-section>
  `
})
export class UtalkPageComponent extends PageComponent {

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
          content: 'meta.utalk.title'
        },
        description: {
          translate: true,
          content: 'meta.utalk.description'
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
