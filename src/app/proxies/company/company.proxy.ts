import {ApiCallService} from '../../services/api-call.service';
import {Company} from '../../models/api-models/company/company';
import {CompanyFactory} from '../../models/api-models/company/company';
import {Injectable} from '@angular/core';

// CREATE
interface CreateCompanyAttributes {
  cin: string;
  city: string;
  company_image_one_time_token?: string;
  email: string;
  name: string;
  phone: string;
  street: string;
  website?: string;
  zip: string;
}

@Injectable()
export class CompanyProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getCompany(companyId: string, searchParameters?: any): Promise<Company> {
    return this.apiCallService.get('companies/' + companyId, searchParameters)
    .then(response => CompanyFactory.createCompany(response.data));
  }

  public getCompanies(searchParameters?: any): Promise<Company[]> {
    return this.apiCallService.get('companies', searchParameters)
    .then(response => response.data.map(company => CompanyFactory.createCompany(company)));
  }

  public getCompaniesWithMeta(searchParameters?: any): Promise<{companies: Company[], meta: {total: number}}> {
    return this.apiCallService.get('companies', searchParameters)
    .then(response => {
      return {
        companies: response.data.map(company => CompanyFactory.createCompany(company)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createCompany(companyAttributes: CreateCompanyAttributes): Promise<Company> {
    return this.apiCallService.post('companies', companyAttributes)
    .then(response => CompanyFactory.createCompany(response.data));
  }
}
