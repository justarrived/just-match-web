import {ApiCall} from '../../services/api-call.service';
import {Status} from '../../models/api-models/status/status';
import {StatusFactory} from '../../models/api-models/status/status';
import {Injectable} from '@angular/core';

@Injectable()
export class StatusProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  // GET
  public getStatuses(searchParameters?: any): Promise<Status[]> {
    return this.apiCall.get('users/statuses', searchParameters)
    .then(response => response.data.map(status => StatusFactory.createStatus(status)));
  }

  public getStatusesWithMeta(searchParameters?: any): Promise<{statuses: Status[], meta: {total: number}}> {
    return this.apiCall.get('users/statuses', searchParameters)
    .then(response => {
      return {
        statuses: response.data.map(status => StatusFactory.createStatus(status)),
        meta: response.meta
      }
    });
  }
}
