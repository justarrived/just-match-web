import {Injectable} from '@angular/core';
import {ApiCall} from '../api-call.service';
import {TranslationService} from '../translation.service';
import {map} from 'lodash';
import {Language} from '../../models/language/language';

@Injectable()
export class LanguageProxy {

  constructor(private apiCall: ApiCall, private translationService: TranslationService) { }

  getSystemLanguages(): Promise<Array<Language>> {
    return this.apiCall.get('languages', {'filter[system_language]': true})
      .then(response => map(response.data, data => new Language(data)));
  }

  getLanguages(name: string = '', sort: string = this.translationService.getSelectedLanguageCode() + '_name', pageSize: number = 300, pageNumber: number = 1): Promise<Array<Language>> {
    let nameFilter = 'filter[' + this.translationService.getSelectedLanguageCode() + '_name' + ']';

    return this.apiCall.get('languages', {nameFilter: name, 'sort': sort, 'page[size]': pageSize, 'page[number]': pageNumber})
      .then(response => map(response.data, data => new Language(data)));
  }

}
