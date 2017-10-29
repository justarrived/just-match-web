import {ApiCallService} from '../../services/api-call.service';
import {UserIgnoredNotifications} from '../../models/api-models/user-ignored-notifications/user-ignored-notifications';
import {UserIgnoredNotificationsFactory} from '../../models/api-models/user-ignored-notifications/user-ignored-notifications';
import {Injectable} from '@angular/core';

@Injectable()
export class UserIgnoredNotificationsProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getUserIgnoredNotifications(searchParameters?: any): Promise<UserIgnoredNotifications[]> {
    return this.apiCallService.get('users/notifications', searchParameters)
    .then(response => response.data.map(notification => UserIgnoredNotificationsFactory.createUserIgnoredNotifications(notification)));
  }

  public getUserIgnoredNotificationsWithMeta(searchParameters?: any): Promise<{notifications: UserIgnoredNotifications[], meta: any}> {
    return this.apiCallService.get('users/notifications', searchParameters)
    .then(response => {
      return {
        notifications: response.data.map(notification => UserIgnoredNotificationsFactory.createUserIgnoredNotifications(notification)),
        meta: response.meta
      }
    });
  }
}
