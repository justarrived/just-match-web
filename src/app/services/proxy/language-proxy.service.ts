import {Injectable} from '@angular/core';
import {ApiCall} from '../api-call.service';
import {map} from 'lodash';
import {Language} from '../../models/language/language';

@Injectable()
export class LanguageProxy {

  constructor(private apiCall: ApiCall) { }

  getSystemLanguages(): Promise<Array<Language>> {
    return this.apiCall.get('languages', {'filter[system_language]': true})
      .then(response => map(response.data, data => new Language(data)));
  }

  getLanguages(name: string = '', sort: string = 'en_name', pageSize: number = 300, pageNumber: number = 1): Promise<Array<Language>> {
    return this.apiCall.get('languages', {'filter[en_name]': name, 'sort': sort, 'page[size]': pageSize, 'page[number]': pageNumber})
      .then(response => map(response.data, data => new Language(data)));
  }

}
