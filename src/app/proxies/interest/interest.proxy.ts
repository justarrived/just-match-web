import {ApiCallService} from '../../services/api-call.service';
import {Interest} from '../../models/api-models/interest/interest';
import {InterestFactory} from '../../models/api-models/interest/interest';
import {Injectable} from '@angular/core';

@Injectable()
export class InterestProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getInterest(interestId: string, searchParameters?: any): Promise<Interest> {
    return this.apiCallService.get('interests/' + interestId, searchParameters)
    .then(response => InterestFactory.createInterest(response.data));
  }

  public getInterests(searchParameters?: any): Promise<Interest[]> {
    return this.apiCallService.get('interests', searchParameters)
    .then(response => response.data.map(interest => InterestFactory.createInterest(interest)));
  }

  public getInterestsWithMeta(searchParameters?: any): Promise<{interests: Interest[], meta: any}> {
    return this.apiCallService.get('interests', searchParameters)
    .then(response => {
      return {
        interests: response.data.map(interest => InterestFactory.createInterest(interest)),
        meta: response.meta
      }
    });
  }
}
