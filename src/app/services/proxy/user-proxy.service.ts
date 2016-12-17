import {Injectable} from '@angular/core';
import {ApiCall} from '../api-call.service';
import {UserStatus} from '../../models/user/user-status';
import {map} from 'lodash';
import {UserImage} from '../../models/user/user-image';
import {UserJob} from '../../models/user/user-job';

@Injectable()
export class UserProxy {

  constructor(private apiCall: ApiCall) {
  }

  getUser(userId: string, includes?: Object): Promise<any> {
    return this.apiCall.get('users/' + userId, includes);
  }

  getUserSession(email, password) {
    return this.apiCall.post('users/sessions', {
      'email_or_phone': email,
      'password': password
    });
  }

  saveUser(user: any): Promise<any> {
    return this.apiCall.post('users', user);
  }

  updateUser(user: any): Promise<any> {
    return this.apiCall.patch('users/' + user.id, user);
  }

  getStatuses(): Promise<Array<UserStatus>> {
    return this.apiCall.get('users/statuses')
      .then(response => map(response.data, data => new UserStatus(data)));
  }

  saveImage(image: FormData): Promise<UserImage> {
    return this.apiCall.postFile('users/images', image)
      .then(response => new UserImage(response.data));
  }

  getUserJobs(userId, additionOptions?: Object) {
    return this.apiCall.get('users/' + userId + '/jobs', additionOptions)
      .then(response => map(response.data, data => new UserJob(data)));
  }

  createFrilansFinans(userId, bankAccount) {
    return this.apiCall.post('users/' + userId + '/frilans-finans', bankAccount);
  }

  resetPassword(email_or_phone: string) {
    return this.apiCall.post('users/reset-password', {
      'email_or_phone': email_or_phone
    });
  }
}
