import {ApiCallService} from '../../services/api-call.service';
import {UserStatus} from '../../models/api-models/user-status/user-status';
import {UserStatusFactory} from '../../models/api-models/user-status/user-status';
import {Injectable} from '@angular/core';

@Injectable()
export class UserStatusProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getUserStatuses(searchParameters?: any): Promise<UserStatus[]> {
    return this.apiCallService.get('users/statuses', searchParameters)
    .then(response => response.data.map(userStatus => UserStatusFactory.createUserStatus(userStatus)));
  }

  public getUserStatusesWithMeta(searchParameters?: any): Promise<{userStatuses: UserStatus[], meta: {total: number}}> {
    return this.apiCallService.get('users/statuses', searchParameters)
    .then(response => {
      return {
        userStatuses: response.data.map(userStatus => UserStatusFactory.createUserStatus(userStatus)),
        meta: response.meta
      }
    });
  }
}
