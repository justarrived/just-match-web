import {Component, OnInit} from '@angular/core';
import {Faq} from '../../models/faq';
import {FaqProxy} from '../../services/proxy/faq-proxy.service';
import {TranslationService} from '../../services/translation.service';
import {TranslationListener} from '../../components/translation.component';

@Component({
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  providers: [FaqProxy]
})
export class FaqComponent extends TranslationListener implements OnInit {
  private faqs: Faq[];

  constructor(
    private faqProxy: FaqProxy,
    protected translationService: TranslationService
  ) {
    super(translationService);
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.faqProxy.getFaqs({ 'filter[filled]': false })
      .then(result => this.faqs = result);
  }
}
