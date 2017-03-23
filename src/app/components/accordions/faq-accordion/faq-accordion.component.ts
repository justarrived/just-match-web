import {Component} from '@angular/core';
import {Faq} from '../../../models/api-models/faq/faq';
import {FaqProxy} from '../../../services/proxy/faq-proxy.service';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'faq-accordion',
  template: `
  <sm-accordion class="styled fluid" [options]="{ exclusive: true, on: 'mouseenter' }">
    <sm-accordion-item *ngFor="let faq of faqs | async">
      <accordion-title>
        {{faq.translatedText.question}}
      </accordion-title>
      <accordion-content >
        <div class="ui padded raised segment" [innerHTML]="faq.translatedText.answer">
        </div>
      </accordion-content>
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
