import {ApiCall} from '../../services/api-call.service';
import {UserInterest} from '../../models/api-models/user-interest/user-interest';
import {UserInterestFactory} from '../../models/api-models/user-interest/user-interest';
import {Injectable} from '@angular/core';

// CREATE
interface CreateUserInterestAttributes {
  id: string;
  level?: number;
}

@Injectable()
export class UserInterestProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  // GET
  public getUserInterest(userId: string, userInterestId: string, searchParameters?: any): Promise<UserInterest> {
    return this.apiCall.get('users/' + userId + '/interests/' + userInterestId, searchParameters)
    .then(response => UserInterestFactory.createUserInterest(response.data));
  }

  public getUserInterests(userId: string, searchParameters?: any): Promise<UserInterest[]> {
    return this.apiCall.get('users/' + userId + '/interests', searchParameters)
    .then(response => response.data.map(userInterest => UserInterestFactory.createUserInterest(userInterest)));
  }

  public getUserInterestsWithMeta(userId: string, searchParameters?: any): Promise<{userInterests: UserInterest[], meta: {total: number}}> {
    return this.apiCall.get('users/' + userId + '/interests', searchParameters)
    .then(response => {
      return {
        userInterests: response.data.map(userInterest => UserInterestFactory.createUserInterest(userInterest)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createUserInterest(userId: string, userInterestAttributes: CreateUserInterestAttributes): Promise<UserInterest> {
    return this.apiCall.post('users/' + userId + '/interests', userInterestAttributes)
    .then(response => UserInterestFactory.createUserInterest(response.data));
  }

  // REMOVE
  public removeUserInterest(userId: string, userInterestId: string, userInterestAttributes: CreateUserInterestAttributes): Promise<UserInterest> {
    return this.apiCall.delete('users/' + userId + '/interests/' + userInterestId)
  }
}
