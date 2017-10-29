import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {GuideSection} from '../../../models/api-models/guide-section/guide-section';
import {GuideSectionArticle} from '../../../models/api-models/guide-section-article/guide-section-article';
import {GuideSectionProxy} from '../../../proxies/guide-section/guide-section.proxy';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {NavigationService} from '../../../services/navigation.service';
import {Output} from '@angular/core';
import {SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'guide-fixed-bottom-menu-pager',
  template: `
    <basic-loader
      [promise]="guideSections"
      class="inverted">
    </basic-loader>
    <fixed-bottom-menu-pager
      [nextUrl]="nextUrl()"
      [previousUrl]="previousUrl()"
      (toggleMenu)="toggleMenu.emit()"
      [canGoBack]="currentSectionIndex > 0 || currentArticleIndex > -1"
      [canGoToNext]="(currentSectionIndex + 1) * (currentArticleIndex + 1) < lastPage || currentSectionIndex + 1 < lastSection"
      [currentPage]="currentArticleIndex + 1"
      [currentSection]="currentSectionIndex + 1"
      [lastPage]="lastPage">
    </fixed-bottom-menu-pager>
  `
})
export class GuideFixedBottomMenuPagerComponent extends BaseComponent {
  @Output() public toggleMenu = new EventEmitter();

  private static readonly guideSectionIdOrSlugParam: string = 'sectionIdOrSlug';
  private static readonly guideSectionArticleIdOrSlugParam: string = 'articleIdOrSlug';

  public currentArticleIndex: number;
  public currentSectionIndex: number;
  public guideSectionArticleIdOrSlug: string;
  public guideSectionIdOrSlug: string;
  public guideSections: Promise<GuideSection[]>;
  public lastPage: number;
  public lastSection: number;
  public nextArticle: GuideSectionArticle;
  public nextSection: GuideSection;
  public previousArticle: GuideSectionArticle;
  public previousSection: GuideSection;

  private routeParamsSubscription: Subscription;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private guideSectionProxy: GuideSectionProxy,
    private navigationService: NavigationService,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.initRouteParamsSubscription();
  }

  private initRouteParamsSubscription(): void {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(params => {
      this.guideSectionIdOrSlug = params[GuideFixedBottomMenuPagerComponent.guideSectionIdOrSlugParam];
      this.guideSectionArticleIdOrSlug = params[GuideFixedBottomMenuPagerComponent.guideSectionArticleIdOrSlugParam];
      this.loadData();
    });
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private loadData(): void {
    let searchParameters = {
      'include': 'articles',
      'sort': 'order'
    };

    this.guideSections = this.guideSectionProxy.getGuideSections(searchParameters).then(sections => {
      this.lastSection = sections.length;
      console.log(this.guideSectionIdOrSlug);

      this.currentSectionIndex = sections.findIndex(section => section.id === this.guideSectionIdOrSlug || section.slug === this.guideSectionIdOrSlug);
      if (this.currentSectionIndex !== -1) {
        let articles = sections[this.currentSectionIndex].articles;

        this.lastPage = articles.length;
        this.currentArticleIndex = articles.findIndex(article => article.id === this.guideSectionArticleIdOrSlug || article.slug === this.guideSectionArticleIdOrSlug);
        this.updateNextAndPrevious(sections);
      } else {
        this.navigationService.navigateNoLocationChange(this.JARoutes.notFound);
      }

      return sections;
    });
  }

  private updateNextAndPrevious(sections: GuideSection[]): void {
    this.updateNext(sections);
    this.updatePrevious(sections);
  }

  private updateNext(sections: GuideSection[]): void {
    this.nextArticle = sections[this.currentSectionIndex].articles[this.currentArticleIndex + 1];
    if (this.nextArticle) {
      this.nextSection = sections[this.currentSectionIndex];
    } else {
      this.nextSection = sections[this.currentSectionIndex + 1];
    }
  }

  private updatePrevious(sections: GuideSection[]): void {
    this.previousArticle = sections[this.currentSectionIndex].articles[this.currentArticleIndex - 1];
    if (this.previousArticle) {
      this.previousSection = sections[this.currentSectionIndex];
    } else {
      this.previousSection = sections[this.currentSectionIndex - 1];
      if (!this.previousSection) {
        this.previousSection = sections[this.currentSectionIndex];
      } else if (this.currentArticleIndex === -1) {
        this.previousArticle = this.previousSection.articles[this.previousSection.articles.length - 1];
      }
    }
  }

  public nextUrl(): string {
    if (this.nextArticle) {
      return this.JARoutes.guideSectionArticle.url([this.nextSection.slug, this.nextArticle.slug]);
    } else {
      if (this.nextSection) {
        return this.JARoutes.guideSection.url([this.nextSection.slug]);
      }
    }
  }

  public previousUrl(): string {
    if (this.previousArticle) {
      return this.JARoutes.guideSectionArticle.url([this.previousSection.slug, this.previousArticle.slug]);
    } else {
      if (this.previousSection) {
        return this.JARoutes.guideSection.url([this.previousSection.slug]);
      }
    }
  }

  public onDestroy(): void {
    if (this.routeParamsSubscription) { this.routeParamsSubscription.unsubscribe(); }
  }
}
