import {ApiCallService} from '../../services/api-call.service';
import {TermsAgreement} from '../../models/api-models/terms-agreement/terms-agreement';
import {TermsAgreementFactory} from '../../models/api-models/terms-agreement/terms-agreement';
import {Injectable} from '@angular/core';

// CREATE
interface CreateTermsConsentAttributes {
  job_id?: string;
  terms_agreement_id: string;
  user_id: string;
}

@Injectable()
export class TermsAgreementProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getTermsAgreement(searchParameters?: any): Promise<TermsAgreement> {
    return this.apiCallService.get('terms-agreements/current', searchParameters)
    .then(response => TermsAgreementFactory.createTermsAgreement(response.data));
  }

  public getTermsAgreementAsCompany(searchParameters?: any): Promise<TermsAgreement> {
    return this.apiCallService.get('terms-agreements/current-company', searchParameters)
    .then(response => TermsAgreementFactory.createTermsAgreement(response.data));
  }

  // CREATE
  public createTermsConsent(termsConsentAttributes: CreateTermsConsentAttributes): Promise<any> {
    return this.apiCallService.post('terms-consents', termsConsentAttributes);
  }
}
