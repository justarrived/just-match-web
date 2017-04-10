import {ApiCallService} from '../../services/api-call.service';
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
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getUserLanguage(userId: string, userLanguageId: string, searchParameters?: any): Promise<UserLanguage> {
    return this.apiCallService.get('users/' + userId + '/languages/' + userLanguageId, searchParameters)
    .then(response => UserLanguageFactory.createUserLanguage(response.data));
  }

  public getUserLanguages(userId: string, searchParameters?: any): Promise<UserLanguage[]> {
    return this.apiCallService.get('users/' + userId + '/languages', searchParameters)
    .then(response => response.data.map(userLanguage => UserLanguageFactory.createUserLanguage(userLanguage)));
  }

  public getUserLanguagesWithMeta(userId: string, searchParameters?: any): Promise<{userLanguages: UserLanguage[], meta: any}> {
    return this.apiCallService.get('users/' + userId + '/languages', searchParameters)
    .then(response => {
      return {
        userLanguages: response.data.map(userLanguage => UserLanguageFactory.createUserLanguage(userLanguage)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createUserLanguage(userId: string, userLanguageAttributes: CreateUserLanguageAttributes, searchParameters?: any): Promise<UserLanguage> {
    return this.apiCallService.post('users/' + userId + '/languages', userLanguageAttributes, searchParameters)
    .then(response => UserLanguageFactory.createUserLanguage(response.data));
  }

  // REMOVE
  public removeUserLanguage(userId: string, userLanguageId: string, userLanguageAttributes: CreateUserLanguageAttributes): Promise<UserLanguage> {
    return this.apiCallService.delete('users/' + userId + '/languages/' + userLanguageId)
  }
}
