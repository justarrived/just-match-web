import {ApiCall} from '../../services/api-call.service';
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
    private apiCall: ApiCall
  ) {
  }

  // GET
  public getTermsAgreements(searchParameters?: any): Promise<TermsAgreement[]> {
    return this.apiCall.get('terms-agreements/current', searchParameters)
    .then(response => response.data.map(termsAgreement => TermsAgreementFactory.createTermsAgreement(termsAgreement)));
  }

  public getTermsAgreementsWithMeta(searchParameters?: any): Promise<{termsAgreements: TermsAgreement[], meta: {total: number}}> {
    return this.apiCall.get('terms-agreements/current', searchParameters)
    .then(response => {
      return {
        termsAgreements: response.data.map(termsAgreement => TermsAgreementFactory.createTermsAgreement(termsAgreement)),
        meta: response.meta
      }
    });
  }

  public getTermsAgreementsAsCompany(searchParameters?: any): Promise<TermsAgreement[]> {
    return this.apiCall.get('terms-agreements/current', searchParameters)
    .then(response => response.data.map(termsAgreement => TermsAgreementFactory.createTermsAgreement(termsAgreement)));
  }

  public getTermsAgreementsAsCompanyWithMeta(searchParameters?: any): Promise<{termsAgreements: TermsAgreement[], meta: {total: number}}> {
    return this.apiCall.get('terms-agreements/current-company', searchParameters)
    .then(response => {
      return {
        termsAgreements: response.data.map(termsAgreement => TermsAgreementFactory.createTermsAgreement(termsAgreement)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createTermsConsent(termsConsentAttributes: CreateTermsConsentAttributes): Promise<any> {
    return this.apiCall.post('terms-consents', termsConsentAttributes);
  }
}
