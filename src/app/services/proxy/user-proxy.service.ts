import {Injectable} from '@angular/core';
import {ApiCall} from '../api-call.service';
import {UserStatus} from '../../models/user/user-status';
import {UserGender} from '../../models/user/user-gender';
import {map} from 'lodash';
import {UserImage} from '../../models/user/user-image';
import {UserJob} from '../../models/user/user-job';
import {getDataUrl} from '../../utils/image-to-data-url.util';

@Injectable()
export class UserProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  public getUser(userId: string, includes?: Object): Promise<any> {
    return this.apiCall.get('users/' + userId, includes);
  }

  public getUsers(includes?: Object): Promise<any> {
    return this.apiCall.get('users', includes);
  }

  public getUserSession(email, password) {
    return this.apiCall.post('users/sessions', {
      'email_or_phone': email,
      'password': password
    });
  }

  public saveUser(user: any): Promise<any> {
    return this.apiCall.post('users', user);
  }

  public updateUser(id: string, user: any): Promise<any> {
    return this.apiCall.patch('users/' + id, user);
  }

  public getStatuses(): Promise<Array<UserStatus>> {
    return this.apiCall.get('users/statuses')
      .then(response => map(response.data, data => new UserStatus(data)));
  }

  public getGenders(): Promise<Array<UserGender>> {
    return this.apiCall.get('users/genders')
      .then(response => map(response.data, data => new UserGender(data)));
  }

  public saveImage(userId, file: File, category: string): Promise<UserImage> {
    return getDataUrl(file)
      .then((dataUrl) => this.apiCall.post('users/' + userId + '/images', {'image': dataUrl,'category': category})
        .then(response => new UserImage(response.data)));
  }

  public getUserJobs(userId, additionOptions?: Object) {
    return this.apiCall.get('users/' + userId + '/jobs', additionOptions)
      .then(response => map(response.data, data => new UserJob(data)));
  }

  public createFrilansFinans(userId, bankAccount) {
    return this.apiCall.post('users/' + userId + '/frilans-finans', bankAccount);
  }

  public resetPassword(email_or_phone: string) {
    return this.apiCall.post('users/reset-password', {
      'email_or_phone': email_or_phone
    });
  }

  public changePassword(password: string, oldPassword: string) {
    return this.apiCall.post('users/change-password', {
      'password': password,
      'old_password': oldPassword
    });
  }

  public changePasswordWithToken(password: string, oneTimeToken: string) {
    return this.apiCall.post('users/change-password', {
      'password': password,
      'one_time_token': oneTimeToken
    });
  }
}
