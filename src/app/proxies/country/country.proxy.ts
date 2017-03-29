import {ApiCallService} from '../../services/api-call.service';
import {Country} from '../../models/api-models/country/country';
import {CountryFactory} from '../../models/api-models/country/country';
import {Injectable} from '@angular/core';

@Injectable()
export class CountryProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getCountries(searchParameters?: any): Promise<Country[]> {
    return this.apiCallService.get('countries', searchParameters)
    .then(response => response.data.map(country => CountryFactory.createCountry(country)));
  }

  public getCountriesWithMeta(searchParameters?: any): Promise<{countries: Country[], meta: {total: number}}> {
    return this.apiCallService.get('countries', searchParameters)
    .then(response => {
      return {
        countries: response.data.map(country => CountryFactory.createCountry(country)),
        meta: response.meta
      }
    });
  }
}
