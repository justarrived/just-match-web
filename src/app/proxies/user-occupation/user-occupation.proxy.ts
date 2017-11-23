import {ApiCallService} from '../../services/api-call.service';
import {Injectable} from '@angular/core';
import {UserOccupation} from '../../models/api-models/user-occupation/user-occupation';
import {UserOccupationFactory} from '../../models/api-models/user-occupation/user-occupation';

// CREATE
interface CreateUserOccupationAttributes {
  id: string;
  years_of_experience?: number;
}

@Injectable()
export class UserOccupationProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getUserOccupation(userId: string, userOccupationId: string, searchParameters?: any): Promise<UserOccupation> {
    return this.apiCallService.get('users/' + userId + '/occupations/' + userOccupationId, searchParameters)
    .then(response => UserOccupationFactory.createUserOccupation(response.data));
  }

  public getUserOccupations(userId: string, searchParameters?: any): Promise<UserOccupation[]> {
    return this.apiCallService.get('users/' + userId + '/occupations', searchParameters)
    .then(response => response.data.map(userOccupation => UserOccupationFactory.createUserOccupation(userOccupation)));
  }

  public getUserOccupationsWithMeta(userId: string, searchParameters?: any): Promise<{userOccupations: UserOccupation[], meta: any}> {
    return this.apiCallService.get('users/' + userId + '/occupations', searchParameters)
    .then(response => {
      return {
        userOccupations: response.data.map(userOccupation => UserOccupationFactory.createUserOccupation(userOccupation)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createUserOccupation(userId: string, userOccupationAttributes: CreateUserOccupationAttributes, searchParameters?: any): Promise<UserOccupation> {
    return this.apiCallService.post('users/' + userId + '/occupations', userOccupationAttributes, searchParameters)
    .then(response => UserOccupationFactory.createUserOccupation(response.data));
  }

  // REMOVE
  public removeUserOccupation(userId: string, userOccupationId: string, userOccupationAttributes: CreateUserOccupationAttributes): Promise<UserOccupation> {
    return this.apiCallService.delete('users/' + userId + '/occupations/' + userOccupationId)
  }
}
