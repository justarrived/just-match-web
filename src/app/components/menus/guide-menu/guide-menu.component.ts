import {ActivatedRoute} from '@angular/router';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EventEmitter} from '@angular/core';
import {GuideSection} from '../../../models/api-models/guide-section/guide-section';
import {GuideSectionProxy} from '../../../proxies/guide-section/guide-section.proxy';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {NavigationService} from '../../../services/navigation.service';
import {Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'guide-menu',
  styleUrls: ['./guide-menu.component.scss'],
  template: `
    <div>
      <basic-loader
        [promise]="guideSections"
        class="inverted">
      </basic-loader>

      <a [routerLink]="JARoutes.guide.url()">
        <basic-title-text
          [text]="'guide.menu.title' | translate"
          color="pink"
          fontSize="large"
          marginTop="0"
          marginBottom="2rem"
          style="cursor: pointer">
        </basic-title-text>
      </a>

      <div
        class="ui list guide-menu-container"
        [style.direction]="systemLanguage.direction"
        [class.guide-border-left]="systemLanguage.direction === 'ltr'"
        [class.guide-border-right]="systemLanguage.direction === 'rtl'">
        <div
          class="guide-menu-section"
          *ngFor="let section of guideSections | async">

          <a [routerLink]="JARoutes.guideSection.url([section.slug])">
            <div
              class="guide-menu-section-title">
              <basic-title-text
                [text]="section.translatedText.title"
                color="black"
                fontSize="small">
              </basic-title-text>
            </div>
          </a>

          <div
            *ngFor="let article of section.articles"
            class="guide-menu-section-item">
            <basic-link
              [color]="article.id === guideSectionArticleIdOrSlug ? 'black' : 'gray'"
              [fontWeight]="article.id === guideSectionArticleIdOrSlug ? 'bold' : 'normal'"
              [routerLink]="JARoutes.guideSectionArticle.url([section.slug, article.slug])"
              [text]="article.translatedText.title"
              fontSize="small"
              hoverColor="pink"
              marginBottom=".5rem"
              marginTop="0">
            </basic-link>
          </div>
        </div>
      </div>
    </div>`
})
export class GuideMenuComponent extends BaseComponent {
  private static readonly guideSectionIdOrSlugParam: string = 'sectionIdOrSlug';
  private static readonly guideSectionArticleIdOrSlugParam: string = 'articleIdOrSlug';

  public guideSections: Promise<GuideSection[]>;
  public guideSectionIdOrSlug: string;
  public guideSectionArticleIdOrSlug: string;

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
      this.guideSectionIdOrSlug = params[GuideMenuComponent.guideSectionIdOrSlugParam];
      this.guideSectionArticleIdOrSlug = params[GuideMenuComponent.guideSectionArticleIdOrSlugParam];
      this.loadData();
    });
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private loadData() {
    let searchParameters = {
      'include': 'articles',
      'sort': 'order'
    };

    this.guideSections = this.guideSectionProxy.getGuideSections(searchParameters);
  }

  public onDestroy(): void {
    if (this.routeParamsSubscription) { this.routeParamsSubscription.unsubscribe(); }
  }
}
