import {ApiCall} from '../../services/api-call.service';
import {UserLanguage} from '../../models/api-models/user-language/user-language';
import {UserLanguageFactory} from '../../models/api-models/user-language/user-language';
import {Injectable} from '@angular/core';

// CREATE
interface CreateUserLanguageAttributes {
  id: string;
  proficiency?: number;
}

@Injectable()
export class UserLanguageProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  // GET
  public getUserLanguage(userId: string, userLanguageId: string, searchParameters?: any): Promise<UserLanguage> {
    return this.apiCall.get('users/' + userId + '/languages/' + userLanguageId, searchParameters)
    .then(response => UserLanguageFactory.createUserLanguage(response.data));
  }

  public getUserLanguages(userId: string, searchParameters?: any): Promise<UserLanguage[]> {
    return this.apiCall.get('users/' + userId + '/languages', searchParameters)
    .then(response => response.data.map(userLanguage => UserLanguageFactory.createUserLanguage(userLanguage)));
  }

  public getUserLanguagesWithMeta(userId: string, searchParameters?: any): Promise<{userLanguages: UserLanguage[], meta: {total: number}}> {
    return this.apiCall.get('users/' + userId + '/languages', searchParameters)
    .then(response => {
      return {
        userLanguages: response.data.map(userLanguage => UserLanguageFactory.createUserLanguage(userLanguage)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createUserLanguage(userId: string, userLanguageAttributes: CreateUserLanguageAttributes): Promise<UserLanguage> {
    return this.apiCall.post('users/' + userId + '/languages', userLanguageAttributes)
    .then(response => UserLanguageFactory.createUserLanguage(response.data));
  }

  // REMOVE
  public removeUserLanguage(userId: string, userLanguageId: string, userLanguageAttributes: CreateUserLanguageAttributes): Promise<UserLanguage> {
    return this.apiCall.delete('users/' + userId + '/languages/' + userLanguageId)
  }
}
