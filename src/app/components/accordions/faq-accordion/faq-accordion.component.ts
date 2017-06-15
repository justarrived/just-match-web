import {Component} from '@angular/core';
import {Faq} from '../../../models/api-models/faq/faq';
import {FaqProxy} from '../../../proxies/faq/faq.proxy';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {Language} from '../../../models/api-models/language/language';
import {OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

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
export class FaqAccordionComponent extends SystemLanguageListener implements OnInit, OnDestroy {
  public faqs: Promise<Faq[]>;

  constructor(
    private faqProxy: FaqProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public systemLanguage: Language;

  private systemLanguageSubscription: Subscription;

  public ngOnInit(): void {
    this.initSystemLanguage()
    this.loadData();
  }

  private initSystemLanguage(): void {
    this.systemLanguage = this.systemLanguagesResolver.getSelectedSystemLanguage();
    this.systemLanguageSubscription = this.systemLanguagesResolver.getSystemLanguageChangeEmitter().subscribe(systemLanguage => {
      this.systemLanguage = systemLanguage;
    });
  }

  protected loadData() {
    this.faqs = this.faqProxy.getFaqs();
  }

  public ngOnDestroy(): void {
    if (this.systemLanguageSubscription) { this.systemLanguageSubscription.unsubscribe(); }
  }
}
