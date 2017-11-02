import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {GuideSection} from '../../../models/api-models/guide-section/guide-section';
import {GuideSectionProxy} from '../../../proxies/guide-section/guide-section.proxy';
import {Inject} from '@angular/core';
import {JARoutes} from '../../../routes/ja-routes/ja-routes';
import {Language} from '../../../models/api-models/language/language';
import {Meta} from '@angular/platform-browser';
import {PageComponent} from '../page.component';
import {PageOptionsService} from '../../../services/page-options.service';
import {RendererFactory2} from '@angular/core';
import {REQUEST} from '../../../../express-engine';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {TranslateService} from '@ngx-translate/core';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  styleUrls: ['./guide-section-page.component.scss'],
  template: `
    <basic-loader
      [promise]="guideSection"
      class="inverted">
    </basic-loader>

    <secondary-navigation
      [navIsVisible]="isMobileMenuVisible"
      (click)="isMobileMenuVisible = false">
      <div style="padding-bottom: 55px;">
        <guide-menu></guide-menu>
      </div>
    </secondary-navigation>

    <div class="guide-section">
      <div
        class="ui tablet computer only grid"
        style="flex-wrap: nowrap;"
        [style.direction]="systemLanguage.direction">
        <container-card
          width="300px">
          <guide-menu></guide-menu>
        </container-card>
        <div style="width: 100%">
          <basic-title-text
            [text]="(guideSection | async)?.translatedText?.title"
            color="white"
            fontSize="huge"
            marginLeft="1rem"
            marginBottom="2rem">
          </basic-title-text>
          <div class="ui grid">
            <a
              *ngFor="let article of (guideSection | async)?.articles; let i = index;"
              [routerLink]="JARoutes.guideSectionArticle.url([guideSectionId, (guideSection | async)?.slug, article.id, article.translatedText.slug])"
              style="margin-bottom: 2rem;">
              <guide-card
                width="300px"
                [animationDelay]="50 * i"
                [clickable]="true"
                [fadedTitle]="(guideSection | async)?.translatedText?.title"
                [title]="article.translatedText.title"
                height="100%">
                <basic-text
                  [text]="article.translatedText.shortDescription"
                  [maxiumLinesEllipsis]="4">
                </basic-text>
              </guide-card>
            </a>
          </div>
          <guide-hint-pager></guide-hint-pager>
        </div>
      </div>

      <div class="ui mobile only grid">
        <basic-title-text
          [text]="(guideSection | async)?.translatedText?.title"
          marginTop="0"
          marginBottom="4rem"
          color="white"
          fontSize="huge">
        </basic-title-text>
        <a
          *ngFor="let article of (guideSection | async)?.articles; let i = index;"
          [routerLink]="JARoutes.guideSectionArticle.url([guideSectionId, (guideSection | async)?.slug, article.id, article.translatedText.slug])"
          style="margin-bottom: 2rem; width: 100%">
          <guide-card
            width="100%"
            [animationDelay]="50 * i"
            [clickable]="true"
            [fadedTitle]="(guideSection | async)?.translatedText?.title"
            [title]="article.translatedText.title">
          </guide-card>
        </a>
        <guide-fixed-bottom-menu-pager
          (toggleMenu)="toggleMenu()">
        </guide-fixed-bottom-menu-pager>
      </div>
    </div>
  `
})
export class GuideSectionPageComponent extends PageComponent {
  private static readonly guideSectionIdParam: string = 'sectionId';

  public guideSection: Promise<GuideSection>;
  public guideSectionId: string;
  public isMobileMenuVisible: boolean;

  private routeParamsSubscription: Subscription;

  public constructor (
    @Inject(DOCUMENT) protected document: any,
    @Inject(REQUEST) protected request: any,
    private activatedRoute: ActivatedRoute,
    private guideSectionProxy: GuideSectionProxy,
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
      rendererFactory,
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

      this.updatePageMeta({
        title: {
          translate: true,
          content: 'meta.guide.section.title'
        },
        description: {
          translate: true,
          content: 'meta.guide.section.description'
        },
        canonicalUrl: PageComponent.getBaseUrl(this.request) + JARoutes.guideSectionSecondary.url([this.guideSectionId])
      });

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

  public toggleMenu(): void {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }
}
