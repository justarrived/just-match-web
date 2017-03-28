import {ApiCallService} from '../../services/api-call.service';
import {Language} from '../../models/api-models/language/language';
import {LanguageFactory} from '../../models/api-models/language/language';
import {Injectable} from '@angular/core';

// CREATE
interface CreateLanguageAttributes {
  lang_code: string;
}

// UPDATE
interface UpdateLanguageAttributes {
  lang_code?: string;
}

@Injectable()
export class LanguageProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getLanguage(languageId: string, searchParameters?: any): Promise<Language> {
    return this.apiCallService.get('languages/' + languageId, searchParameters)
    .then(response => LanguageFactory.createLanguage(response.data));
  }

  public getLanguages(searchParameters?: any): Promise<Language[]> {
    return this.apiCallService.get('languages', searchParameters)
    .then(response => response.data.map(language => LanguageFactory.createLanguage(language)));
  }

  public getLanguagesWithMeta(searchParameters?: any): Promise<{languages: Language[], meta: {total: number}}> {
    return this.apiCallService.get('languages', searchParameters)
    .then(response => {
      return {
        languages: response.data.map(language => LanguageFactory.createLanguage(language)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createLanguage(languageAttributes: CreateLanguageAttributes): Promise<Language> {
    return this.apiCallService.post('languages', languageAttributes)
    .then(response => LanguageFactory.createLanguage(response.data));
  }

  // UPDATE
  public updateLanguage(languageId: string, languageAttributes: UpdateLanguageAttributes): Promise<Language> {
    return this.apiCallService.patch('languages/' + languageId, languageAttributes)
    .then(response => LanguageFactory.createLanguage(response.data));
  }

  // REMOVE
  public removeLanguage(languageId: string): Promise<any> {
    return this.apiCallService.delete('languages/' + languageId);
  }
}
