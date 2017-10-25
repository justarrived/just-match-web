import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {GuideSection} from '../../../models/api-models/guide-section/guide-section';
import {GuideSectionProxy} from '../../../proxies/guide-section/guide-section.proxy';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'guide-welcome-card',
  styleUrls: ['./guide-welcome-card.component.scss'],
  template: `
    <guide-card
      [fadedTitle]="'guide.card.welcome.faded.title' | translate"
      [title]="'guide.card.welcome.title' | translate"
      [width]="width">
      <basic-loader
        [promise]="guideSections"
        class="inverted">
      </basic-loader>
      <basic-text [text]="'guide.card.welcome.paragraph.1' | translate"></basic-text>
      <basic-text [text]="'guide.card.welcome.paragraph.2' | translate"></basic-text>
      <div
        class="numbered-item"
        [style.direction]="systemLanguage.direction">
        <div class="numbered-item-content">
          <basic-title-text
            marginTop="0"
            marginBottom="0"
            fontSize="small"
            [text]="'guide.card.welcome.item.1.title' | translate">
          </basic-title-text>
          <basic-text
            marginBottom="0"
            [text]="'guide.card.welcome.item.1.paragraph' | translate">
          </basic-text>
        </div>
      </div>
      <div
        class="numbered-item"
        [style.direction]="systemLanguage.direction">
        <div class="numbered-item-content">
          <basic-title-text
            marginTop="0"
            marginBottom="0"
            fontSize="small"
            [text]="'guide.card.welcome.item.2.title' | translate">
          </basic-title-text>
          <basic-text
            marginBottom="0"
            [text]="'guide.card.welcome.item.2.paragraph' | translate">
          </basic-text>
      </div>
      </div>
      <div
        class="numbered-item"
        [style.direction]="systemLanguage.direction">
        <div class="numbered-item-content">
          <basic-title-text
            marginTop="0"
            marginBottom="0"
            fontSize="small"
            [text]="'guide.card.welcome.item.3.title' | translate">
          </basic-title-text>
          <basic-text
            marginBottom="0"
            [text]="'guide.card.welcome.item.3.paragraph' | translate">
          </basic-text>
        </div>
      </div>
      <base-navigation-button
        *ngIf="firstGuideSection"
        [buttonText]="'guide.card.welcome.button' | translate"
        [routerLink]="JARoutes.guideSection.url([firstGuideSection.slug])"
        size="small"
        style="margin: 0 auto">
      </base-navigation-button>
    </guide-card>
    `

})
export class GuideWelcomeCardComponent extends BaseComponent {
  @Input() public width: string = '100%';

  public guideSections: Promise<GuideSection[]>;
  public firstGuideSection: GuideSection;

  public constructor (
    private guideSectionProxy: GuideSectionProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.loadData();
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private loadData() {
    let searchParameters = {
      'sort': 'order',
      'page[size]': 1,
    };

    this.guideSections = this.guideSectionProxy.getGuideSections(searchParameters).then(guideSections => {
      this.firstGuideSection = guideSections[0];
      return guideSections;
    });

  }
}
