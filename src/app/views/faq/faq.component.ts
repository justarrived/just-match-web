import {Component, OnInit} from '@angular/core';
import {Faq} from '../../models/faq';
import {FaqProxy} from '../../services/proxy/faq-proxy.service';

@Component({
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  providers: [FaqProxy]
})
export class FaqComponent implements OnInit {
  faqs: Faq[];

  constructor(private faqProxy: FaqProxy) {
  }

  ngOnInit() {
    this.faqProxy.getFaqs({ 'filter[filled]': false })
      .then(result => this.faqs = result);
  }
}
