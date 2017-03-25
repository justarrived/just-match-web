import {Injectable} from '@angular/core';
import {ApiCall} from '../api-call.service';
import {Faq} from '../../models/api-models/faq/faq';
import {FaqFactory} from '../../models/api-models/faq/faq';
import {map} from 'lodash';

@Injectable()
export class FaqProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  public getFaqs(additionOptions?: any) {
    return this.apiCall.get('faqs', additionOptions)
      .then(response => map(response.data, data => FaqFactory.createFaq(data)));
  }
}
