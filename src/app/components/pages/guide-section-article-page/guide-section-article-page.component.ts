import {ActivatedRoute} from '@angular/router';
import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {GuideSectionArticle} from '../../../models/api-models/guide-section-article/guide-section-article';
import {GuideSectionArticleProxy} from '../../../proxies/guide-section-article/guide-section-article.proxy';
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
  styleUrls: ['./guide-section-article-page.component.scss'],
  template: `
    <basic-loader
      [promise]="guideSectionArticle"
      class="inverted">
    </basic-loader>

    <secondary-navigation
      [navIsVisible]="isMobileMenuVisible"
      (click)="isMobileMenuVisible = false">
      <div style="padding-bottom: 55px;">
        <guide-menu></guide-menu>
      </div>
    </secondary-navigation>

    <div class="guide-article">
      <div class="ui padded basic segment">
        <div
          class="ui tablet computer only grid"
          style="flex-wrap: nowrap;"
          [style.direction]="systemLanguage.direction">
          <container-card
            width="300px">
            <guide-menu></guide-menu>
          </container-card>
          <div>
            <guide-card
              [fadedTitle]="(guideSectionArticle | async)?.translatedText?.title"
              [title]="(guideSectionArticle | async)?.translatedText?.title"
              width="100%"
              style="width: 100%">
              <basic-text
                [unsafeHtml]="(guideSectionArticle | async)?.translatedText?.bodyHtml">
              </basic-text>
              <share-with-modal-section></share-with-modal-section>
            </guide-card>
            <guide-hint-pager></guide-hint-pager>
          </div>
        </div>

        <div class="ui mobile only grid">
          <guide-card
            [fadedTitle]="(guideSectionArticle | async)?.translatedText?.title"
            [title]="(guideSectionArticle | async)?.translatedText?.title"
            width="100%"
            style="width: 100%">
            <basic-text
              [unsafeHtml]="(guideSectionArticle | async)?.translatedText?.bodyHtml">
            </basic-text>
            <share-with-modal-section></share-with-modal-section>
          </guide-card>
          <guide-fixed-bottom-menu-pager
            (toggleMenu)="toggleMenu()">
          </guide-fixed-bottom-menu-pager>
        </div>
      </div>
    </div>
  `
})
export class GuideSectionArticlePageComponent extends PageComponent {
  private static readonly guideSectionIdParam: string = 'sectionId';
  private static readonly guideSectionArticleIdParam: string = 'articleId';

  public guideSectionArticle: Promise<GuideSectionArticle>;
  public guideSectionId: string;
  public guideSectionArticleId: string;
  public isMobileMenuVisible: boolean;

  private routeParamsSubscription: Subscription;

  public constructor (
    @Inject(DOCUMENT) protected document: any,
    @Inject(REQUEST) protected request: any,
    private activatedRoute: ActivatedRoute,
    private guideSectionArticleProxy: GuideSectionArticleProxy,
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
          content: 'meta.guide.section.article.title'
        },
        description: {
          translate: true,
          content: 'meta.guide.section.article.description'
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
      this.guideSectionId = params[GuideSectionArticlePageComponent.guideSectionIdParam];
      this.guideSectionArticleId = params[GuideSectionArticlePageComponent.guideSectionArticleIdParam];

      this.updatePageMeta({
        title: {
          translate: true,
          content: 'meta.guide.section.title'
        },
        description: {
          translate: true,
          content: 'meta.guide.section.description'
        },
        canonicalUrl: PageComponent.getBaseUrl(this.request) + JARoutes.guideSectionArticleSecondary.url([this.guideSectionId, this.guideSectionArticleId])
      });

      this.loadData();
    });
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private loadData() {
    let searchParameters = {
      'include': 'section'
    };

    this.guideSectionArticle = this.guideSectionArticleProxy.getGuideSectionArticle(this.guideSectionId, this.guideSectionArticleId, searchParameters);
  }

  public onDestroy(): void {
    if (this.routeParamsSubscription) { this.routeParamsSubscription.unsubscribe(); }
  }

  public toggleMenu(): void {
    this.isMobileMenuVisible = !this.isMobileMenuVisible;
  }
}
