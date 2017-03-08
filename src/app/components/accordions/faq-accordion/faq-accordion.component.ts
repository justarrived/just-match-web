import {Component} from '@angular/core';
import {Faq} from '../../../models/faq';
import {FaqProxy} from '../../../services/proxy/faq-proxy.service';
import {OnInit} from '@angular/core';
import {TranslationListener} from '../../../components/translation.component';
import {TranslationService} from '../../../services/translation.service';

@Component({
  selector: 'faq-accordion',
  template: `
  <sm-accordion class="styled fluid" [options]="{ exclusive: true, on: 'mouseenter' }">
    <sm-accordion-item *ngFor="let faq of faqs | async">
      <accordion-title>
        {{faq.translated.question}}
      </accordion-title>
      <accordion-content >
        <div class="ui padded raised segment" [innerHTML]="faq.translated.answer">
        </div>
      </accordion-content>
    </sm-accordion-item>
  </sm-accordion>`
})
export class FaqAccordionComponent extends TranslationListener implements OnInit {
  public faqs: Promise<Faq[]>;

  constructor(
    private faqProxy: FaqProxy,
    protected translationService: TranslationService
  ) {
    super(translationService);
  }

  public ngOnInit() {
    this.loadData();
  }

  protected loadData() {
    this.faqs = this.faqProxy.getFaqs();
  }
}
