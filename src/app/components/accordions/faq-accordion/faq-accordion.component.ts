import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Faq} from '../../../models/api-models/faq/faq';
import {FaqProxy} from '../../../proxies/faq/faq.proxy';
import {Language} from '../../../models/api-models/language/language';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'faq-accordion',
  template: `
    <basic-accordion
      [options]="{ exclusive: true }"
      class="styled fluid">
      <basic-accordion-item *ngFor="let faq of faqs | async">
        <basic-title-text
          accordion-title
          [text]="faq.translatedText.question"
          style="width: 100%"
          color="black"
          fontSize="small"
          marginTop="0"
          marginBottom="0">
        </basic-title-text>
        <div accordion-content>
          <div class="ui padded raised segment">
            <basic-text
              [unsafeHtml]="faq.translatedText.answer"
              color="black"
              marginTop="0"
              marginBottom="0">
            </basic-text>
          </div>
        </div>
      </basic-accordion-item>
    </basic-accordion>`
})
export class FaqAccordionComponent extends BaseComponent {
  public faqs: Promise<Faq[]>;

  public constructor(
    private faqProxy: FaqProxy,
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

  protected loadData() {
    this.faqs = this.faqProxy.getFaqs();
  }
}
