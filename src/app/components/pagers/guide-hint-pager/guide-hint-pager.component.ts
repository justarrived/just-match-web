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
  selector: 'guide-hint-pager',
  template: `
    <div
      class="ui basic segment"
      style="padding: 0">
      <basic-loader
        [promise]="guideSections"
        class="inverted">
      </basic-loader>
      <hint-pager
        [nextUrl]="nextUrl()"
        [previousUrl]="previousUrl()"
        [canGoBack]="currentSectionIndex > 0 || currentArticleIndex > -1"
        [canGoToNext]="(currentSectionIndex + 1) * (currentArticleIndex + 1) < lastPage || currentSectionIndex + 1 < lastSection"
        [currentPage]="(currentSectionIndex + 1) * (currentArticleIndex + 1)"
        [currentSection]="currentSectionIndex + 1"
        [hintNext]="nextArticle?.title || nextSection?.title"
        [hintPrevious]="previousArticle?.title || previousSection?.title"
        [lastPage]="lastPage">
      </hint-pager>
    </div>
  `
})
export class GuideHintPagerComponent extends BaseComponent {

  private static readonly guideSectionIdParam: string = 'sectionId';
  private static readonly guideSectionArticleIdParam: string = 'articleId';

  public currentArticleIndex: number;
  public currentSectionIndex: number;
  public guideSectionArticleId: string;
  public guideSectionId: string;
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
      this.guideSectionId = params[GuideHintPagerComponent.guideSectionIdParam];
      this.guideSectionArticleId = params[GuideHintPagerComponent.guideSectionArticleIdParam];
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

      this.currentSectionIndex = sections.findIndex(section => section.id === this.guideSectionId);
      if (this.currentSectionIndex !== -1) {
        let articles = sections[this.currentSectionIndex].articles;

        this.lastPage = articles.length;
        this.currentArticleIndex = articles.findIndex(article => article.id === this.guideSectionArticleId);
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
      return this.JARoutes.guideSectionArticle.url([this.nextSection.id, this.nextSection.translatedText.slug, this.nextArticle.id, this.nextArticle.translatedText.slug]);
    } else {
      if (this.nextSection) {
        return this.JARoutes.guideSection.url([this.nextSection.id, this.nextSection.translatedText.slug]);
      }
    }
  }

  public previousUrl(): string {
    if (this.previousArticle) {
      return this.JARoutes.guideSectionArticle.url([this.previousSection.id, this.previousSection.translatedText.slug, this.previousArticle.id, this.previousArticle.translatedText.slug]);
    } else {
      if (this.previousSection) {
        return this.JARoutes.guideSection.url([this.previousSection.id, this.previousSection.translatedText.slug]);
      }
    }
  }

  public onDestroy(): void {
    if (this.routeParamsSubscription) { this.routeParamsSubscription.unsubscribe(); }
  }
}
