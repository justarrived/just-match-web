import {Injectable} from '@angular/core';
import {ApiCall} from '../api-call.service';
import {Faq} from '../../models/api-models/faq/faq';
import {map} from 'lodash';

@Injectable()
export class FaqProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  public getFaqs(additionOptions?: Object) {
    return this.apiCall.get('faqs', additionOptions)
      .then(response => map(response.data, data => new Faq(data)));
  }
}
