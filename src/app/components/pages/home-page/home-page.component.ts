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
    <welcome-banner-section></welcome-banner-section>

    <new-jobs-section></new-jobs-section>

    <user-missing-traits-message></user-missing-traits-message>

    <applications-status-section *ngIf="user"></applications-status-section>

    <div class="ui basic padded center aligned segment utalk-section-container">
      <basic-title-text
        [text]="'section.utalk.title' | translate"
        [underlineBelow]="true"
        fontSize="huge"
        textAlignmentLtr="center"
        textAlignmentRtl="center"
        underlineBelowColor="blue"
        underlineBelowLtrAlignment="center"
        underlineBelowRtlAlignment="center">
      </basic-title-text>
      <div class="ui centered grid">
        <div class="ui sixteen wide mobile twelve wide tablet eight wide computer column">
          <basic-text
            [text]="'section.utalk.description' | translate"
            textAlignmentLtr="center"
            textAlignmentRtl="center">
          </basic-text>

          <base-action-button
            *ngIf="!(utalkCode | async)"
            [buttonText]="'section.utalk.not_logged_in_button' | translate"
            (click)="openLoginOrRegisterModal()"
            kind="primary"
            size="medium">
          </base-action-button>
        </div>
      </div>
    </div>

    <utalk-section></utalk-section>

    <how-it-works-section *ngIf="!user"></how-it-works-section>

    <requirements-section></requirements-section>
  `
})
export class HomePageComponent extends PageComponent {

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
          content: 'meta.home.title'
        },
        description: {
          translate: true,
          content: 'meta.home.description'
        }
      },
      document,
      meta,
      pageOptionsService,
      rendererFactory,
      request,
      systemLanguagesResolver,
      translateService,
      userResolver,
      true,
    );
  }
}
