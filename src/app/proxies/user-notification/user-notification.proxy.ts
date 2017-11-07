import {ApiCallService} from '../../services/api-call.service';
import {UserNotification} from '../../models/api-models/user-notification/user-notification';
import {UserNotificationFactory} from '../../models/api-models/user-notification/user-notification';
import {Injectable} from '@angular/core';

@Injectable()
export class UserNotificationProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getUserNotifications(searchParameters?: any): Promise<UserNotification[]> {
    return this.apiCallService.get('users/notifications', searchParameters)
    .then(response => response.data.map(notification => UserNotificationFactory.createUserNotification(notification)));
  }

  public getUserNotificationsWithMeta(searchParameters?: any): Promise<{notifications: UserNotification[], meta: any}> {
    return this.apiCallService.get('users/notifications', searchParameters)
    .then(response => {
      return {
        notifications: response.data.map(notification => UserNotificationFactory.createUserNotification(notification)),
        meta: response.meta
      }
    });
  }
}
