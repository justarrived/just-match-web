import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {GuideSection} from '../../../models/api-models/guide-section/guide-section';
import {GuideSectionProxy} from '../../../proxies/guide-section/guide-section.proxy';
import {Inject} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {Meta} from '@angular/platform-browser';
import {PageComponent} from '../page.component';
import {PageOptionsService} from '../../../services/page-options.service';
import {REQUEST} from '../../../../express-engine';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  template: `
    <basic-loader
      [promise]="guideSection"
      class="inverted">
    </basic-loader>
    <div class="ui padded basic segment">
      <div
        class="ui tablet computer only grid"
        style="flex-wrap: nowrap;">
        <container-card
          width="300px">
          <guide-navigation></guide-navigation>
        </container-card>
        <div>
          <basic-title-text
            [text]="(guideSection | async)?.translatedText?.title"
            color="black"
            fontSize="huge"
            marginLeft="1rem"
            marginBottom="2rem">
          </basic-title-text>
          <div class="ui grid">
            <guide-card
              *ngFor="let article of (guideSection | async)?.articles; let i = index;"
              width="300px"
              [animationDelay]="50 * i"
              [routerLink]="JARoutes.guideSectionArticle.url([guideSectionId, article.id])"
              [clickable]="true"
              [fadedTitle]="(guideSection | async)?.translatedText?.title"
              [title]="article.translatedText.title"
              height="100%"
              style="margin-bottom: 2rem">
              <basic-text
                [text]="article.translatedText.shortDescription"
                [maxiumLinesEllipsis]="4">
              </basic-text>
            </guide-card>
          </div>
        </div>
      </div>

      <div class="ui mobile only grid">
        <basic-title-text
          [text]="(guideSection | async)?.translatedText?.title"
          marginTop="0"
          marginBottom="4rem"
          color="black"
          fontSize="huge">
        </basic-title-text>
        <guide-card
          *ngFor="let article of (guideSection | async)?.articles; let i = index;"
          width="100%"
          [animationDelay]="50 * i"
          [routerLink]="JARoutes.guideSectionArticle.url([guideSectionId, article.id])"
          [clickable]="true"
          [fadedTitle]="(guideSection | async)?.translatedText?.title"
          [title]="article.translatedText.title"
          style="margin-bottom: 2rem; width: 100%">
        </guide-card>
      </div>
    </div>
  `
})
export class GuideSectionPageComponent extends PageComponent {
  private static readonly guideSectionIdParam: string = 'sectionId';

  public guideSection: Promise<GuideSection>;
  public guideSectionId: string;

  private routeParamsSubscription: Subscription;

  public constructor (
    @Inject(DOCUMENT) protected document: any,
    @Inject(REQUEST) protected request: any,
    private activatedRoute: ActivatedRoute,
    private guideSectionProxy: GuideSectionProxy,
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
          content: 'meta.guide.section.title'
        },
        description: {
          translate: true,
          content: 'meta.guide.section.description'
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

  public onInit(): void {
    this.initRouteParamsSubscription();
  }

  private initRouteParamsSubscription(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(params => {
      this.guideSectionId = params[GuideSectionPageComponent.guideSectionIdParam];
      this.loadData();
    });
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private loadData() {
    let searchParameters = {
      'include': 'articles'
    };

    this.guideSection = this.guideSectionProxy.getGuideSection(this.guideSectionId, searchParameters);
  }

  public onDestroy(): void {
    if (this.routeParamsSubscription) { this.routeParamsSubscription.unsubscribe(); }
  }
}
