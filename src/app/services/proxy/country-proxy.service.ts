import {Injectable} from '@angular/core';
import {ApiCall} from '../api-call.service';
import {TranslationService} from '../translation.service';
import {map} from 'lodash';
import {Country} from '../../models/country';

@Injectable()
export class CountryProxy {

  constructor(private apiCall: ApiCall, private translationService: TranslationService) { }

  getCountries(name: string = '', sort: string = this.translationService.getSelectedLanguageCode() + '_name'): Promise<Array<Country>> {
    let nameFilter = 'filter[' + this.translationService.getSelectedLanguageCode() + '_name' + ']';

    return this.apiCall.get('countries', {nameFilter: name, 'sort': sort})
      .then(response => map(response.data, data => new Country(data)));
  }

  getCountryByCountryCode(countryCode: string): Promise<Country> {
    return this.apiCall.get('countries', {'filter[country_code]': countryCode})
      .then(response => {
        if (response.data && response.data[0]) {
          return new Country(response.data[0]);
        }
        return null;
      });
  }
}
