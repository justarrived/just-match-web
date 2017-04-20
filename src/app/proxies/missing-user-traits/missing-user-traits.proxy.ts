import {ApiCallService} from '../../services/api-call.service';
import {MissingUserTraits} from '../../models/api-models/missing-user-traits/missing-user-traits';
import {MissingUserTraitsFactory} from '../../models/api-models/missing-user-traits/missing-user-traits';
import {Injectable} from '@angular/core';

@Injectable()
export class MissingUserTraitsProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getMissingUserTraitsForJob(jobId: string, userId: string, searchParameters?: any): Promise<MissingUserTraits> {
    return this.apiCallService.get('jobs/' + jobId + '/users/' + userId + '/missing-traits', searchParameters)
    .then(response => MissingUserTraitsFactory.createMissingUserTraits(response.data));
  }

  public getMissingUserTraits(userId: string, searchParameters?: any): Promise<MissingUserTraits> {
    return this.apiCallService.get('users/' + userId + '/missing-traits', searchParameters)
    .then(response => MissingUserTraitsFactory.createMissingUserTraits(response.data));
  }
}
