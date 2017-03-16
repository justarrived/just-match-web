import {Injectable} from '@angular/core';
import {ApiCall} from '../api-call.service';
import {map} from 'lodash';
import {Language} from '../../models/language/language';

@Injectable()
export class LanguageProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  public getSystemLanguages(): Promise<Array<Language>> {
    return this.apiCall.get('languages', {'filter[system_language]': true})
      .then(response => map(response.data, data => new Language(data)));
  }

  public getLanguage(id: string): Promise<Language> {
    return this.apiCall.get('languages/' + id)
      .then(response => new Language(response.data));
  }

  public getLanguages(name: string = '', sort: string = 'name', pageSize: number = 300, pageNumber: number = 1): Promise<Array<Language>> {
    let nameFilter = 'filter[name]';

    return this.apiCall.get('languages', {nameFilter: name, 'sort': sort, 'page[size]': pageSize, 'page[number]': pageNumber})
      .then(response => map(response.data, data => new Language(data)));
  }

}
