import {ApiCallService} from '../../services/api-call.service';
import {UtalkCode} from '../../models/api-models/utalk-code/utalk-code';
import {UtalkCodeFactory} from '../../models/api-models/utalk-code/utalk-code';
import {Injectable} from '@angular/core';

@Injectable()
export class UtalkCodeProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getUtalkCode(userId: string, searchParameters?: any): Promise<UtalkCode> {
    return this.apiCallService.get('users/' + userId + '/utalk-codes', searchParameters)
    .then(response => UtalkCodeFactory.createUtalkCode(response.data));
  }

  // CREATE
  public createUtalkCode(userId: string, searchParameters?: any): Promise<UtalkCode> {
    return this.apiCallService.post('users/' + userId + '/utalk-codes', {}, searchParameters)
    .then(response => UtalkCodeFactory.createUtalkCode(response.data));
  }
}
