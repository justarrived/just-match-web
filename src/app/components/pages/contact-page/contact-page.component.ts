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
  <basic-border-section
    [header]="'contact.title' | translate"
    icon="comments">
  </basic-border-section>
  <div class="ui centered grid">
    <div class="fourteen wide mobile ten wide tablet eight wide computer column">
      <div class="contact-form-container">
        <div class="contact-form-description">
          <basic-text
            [text]="'contact.form.description'| translate"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-text>
          <basic-text
            [text]="'contact.form.instruction'| translate"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-text>
        </div>

        <div class="contact-form-icon-container">
          <i class="contact-form-icon fa fa-envelope fa-5x"></i>
        </div>

        <contact-form></contact-form>
      </div>
    </div>
  </div>`,
  styleUrls: ['./contact-page.component.scss']
})
export class ContactPageComponent extends PageComponent {

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
          content: 'meta.contact.title'
        },
        description: {
          translate: true,
          content: 'meta.contact.description'
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
