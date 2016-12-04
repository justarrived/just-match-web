import {Component, OnInit} from '@angular/core';
import {Faq} from '../../models/faq';
import {FaqProxy} from '../../services/proxy/faq-proxy.service';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  providers: [FaqProxy]
})
export class FaqComponent implements OnInit {
  faqs: Faq[];
  totalQuestions: number = 1;
  page: number = 1;
  pageSize: number = 10;

  constructor(private faqProxy: FaqProxy, private location: Location, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.page = (params['page'] && parseInt(params['page'])) || 1;
    });
  }

  ngOnInit() {
    this.faqProxy.getFaqs({include: 'question,answer,language', 'filter[filled]': false, 'page[number]': this.page.toString()})
      .then(result => {
        this.faqs = result.data;
        this.totalQuestions = result.total;
      });
  }

  onPageChange(page) {
    this.location.replaceState('/faqs/' + page);
    this.page = page;
    this.ngOnInit();
  }
}
