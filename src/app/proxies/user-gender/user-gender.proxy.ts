import {ApiCall} from '../../services/api-call.service';
import {UserGender} from '../../models/api-models/user-gender/user-gender';
import {UserGenderFactory} from '../../models/api-models/user-gender/user-gender';
import {Injectable} from '@angular/core';

@Injectable()
export class UserGenderProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  // GET
  public getUserGenders(searchParameters?: any): Promise<UserGender[]> {
    return this.apiCall.get('users/genders', searchParameters)
    .then(response => response.data.map(userGender => UserGenderFactory.createUserGender(userGender)));
  }

  public getUserGendersWithMeta(searchParameters?: any): Promise<{userGenders: UserGender[], meta: {total: number}}> {
    return this.apiCall.get('users/genders', searchParameters)
    .then(response => {
      return {
        userGenders: response.data.map(userGender => UserGenderFactory.createUserGender(userGender)),
        meta: response.meta
      }
    });
  }
}
