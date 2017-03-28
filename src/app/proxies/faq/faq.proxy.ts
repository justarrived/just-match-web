import {ApiCallService} from '../../services/api-call.service';
import {Faq} from '../../models/api-models/faq/faq';
import {FaqFactory} from '../../models/api-models/faq/faq';
import {Injectable} from '@angular/core';

@Injectable()
export class FaqProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getFaqs(searchParameters?: any): Promise<Faq[]> {
    return this.apiCallService.get('faqs', searchParameters)
    .then(response => response.data.map(faq => FaqFactory.createFaq(faq)));
  }

  public getFaqsWithMeta(searchParameters?: any): Promise<{faqs: Faq[], meta: {total: number}}> {
    return this.apiCallService.get('faqs', searchParameters)
    .then(response => {
      return {
        faqs: response.data.map(faq => FaqFactory.createFaq(faq)),
        meta: response.meta
      }
    });
  }
}
