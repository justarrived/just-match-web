import {Component, OnInit} from '@angular/core';
//import {FaqProxy} from '../../services/proxy/faq-proxy.service';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  //  providers: [FaqProxy]
})
export class ContactComponent implements OnInit {
  name: string;
  email: string;
  message: string;

  constructor(/*private faqProxy: FaqProxy*/) {
  }

  ngOnInit() {
  }
}
