import {Injectable} from '@angular/core';
import {ApiCall} from '../api-call.service';
import {map} from 'lodash';
import {Country} from '../../models/country';

@Injectable()
export class CountryProxy {

  constructor(
    private apiCall: ApiCall,
  ) {
  }

  public getCountries(name: string = '', sort: string = 'name'): Promise<Array<Country>> {
    let nameFilter = 'filter[name]';

    return this.apiCall.get('countries', {nameFilter: name, 'sort': sort})
      .then(response => map(response.data, data => new Country(data)));
  }

  public getCountryByCountryCode(countryCode: string): Promise<Country> {
    return this.apiCall.get('countries', {'filter[country_code]': countryCode})
      .then(response => {
        if (response.data && response.data[0]) {
          return new Country(response.data[0]);
        }
        return null;
      });
  }
}
