import {Component} from '@angular/core';
import {Faq} from '../../../models/api-models/faq/faq';
import {FaqProxy} from '../../../proxies/faq/faq.proxy';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'faq-accordion',
  template: `
    <sm-accordion
      [options]="{ exclusive: true }"
      class="styled fluid">
      <sm-accordion-item *ngFor="let faq of faqs | async">
        <h4
          accordion-title
          style="margin: 0;">
          {{faq.translatedText.question}}
        </h4>
        <div accordion-content>
          <div
            [innerHTML]="faq.translatedText.answer"
            class="ui padded raised segment">
          </div>
        </div>
      </sm-accordion-item>
    </sm-accordion>`
})
export class FaqAccordionComponent extends SystemLanguageListener implements OnInit {
  public faqs: Promise<Faq[]>;

  constructor(
    private faqProxy: FaqProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit() {
    this.loadData();
  }

  protected loadData() {
    this.faqs = this.faqProxy.getFaqs();
  }
}
