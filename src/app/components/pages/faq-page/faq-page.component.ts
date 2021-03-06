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
  styleUrls: ['./faq-page.component.scss'],
  template: `
  <div
    class="ui grid faq-page-grid"
    [style.direction]="systemLanguage.direction">

    <basic-title-text
      [text]="'faq.title' | translate"
      [underlineBelow]="true"
      color="black"
      fontSize="huge"
      textAlignmentLtr="center"
      textAlignmentRtl="center"
      underlineBelowColor="pink"
      underlineBelowLtrAlignment="center"
      underlineBelowRtlAlignment="center"
      marginTop="30px"
      marginBottom="30px">
    </basic-title-text>

    <faq-accordion style="width: 100%"></faq-accordion>
  </div>
  `
})
export class FaqPageComponent extends PageComponent {

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
          content: 'meta.faq.title'
        },
        description: {
          translate: true,
          content: 'meta.faq.description'
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
