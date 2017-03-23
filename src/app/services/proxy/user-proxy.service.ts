import {ApiCall} from '../api-call.service';
import {Application} from '../../models/api-models/application/application';
import {Document} from '../../models/api-models/document/document';
import {Gender} from '../../models/api-models/gender/gender';
import {getDataUrl} from '../../utils/image-to-data-url.util';
import {Injectable} from '@angular/core';
import {map} from 'lodash';
import {Status} from '../../models/api-models/status/status';
import {User} from '../../models/api-models/user/user';
import {UserDocument} from '../../models/api-models/user/user-document';
import {UserImage} from '../../models/api-models/user/user-image';

@Injectable()
export class UserProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  public getUser(userId: string, includes?: Object): Promise<User> {
    return this.apiCall.get('users/' + userId, includes)
      .then(response => new User(response.data));
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

  public getStatuses(): Promise<Array<Status>> {
    return this.apiCall.get('users/statuses')
      .then(response => map(response.data, data => new Status(data)));
  }

  public getGenders(): Promise<Array<Gender>> {
    return this.apiCall.get('users/genders')
      .then(response => map(response.data, data => new Gender(data)));
  }

  public saveImage(userId, file: File, category: string): Promise<UserImage> {
    return getDataUrl(file)
      .then((dataUrl) => this.apiCall.post('users/' + userId + '/images', {'image': dataUrl,'category': category})
        .then(response => new UserImage(response.data)));
  }

  public saveDocument(file: File): Promise<Document> {
    return getDataUrl(file)
      .then((dataUrl) => this.apiCall.post('documents/', {'document': dataUrl})
        .then(response => new Document(response.data)));
  }

  public saveUserDocument(userId, document: Document, category: string): Promise<UserDocument> {
    return this.apiCall.post('users/' + userId + '/documents', {'document_one_time_token': document.oneTimeToken,'category': category})
        .then((response) => {
          const userDocument = new UserDocument(response.data);
          userDocument.document = document;
          return userDocument;
        });
  }

  public getApplications(userId, additionOptions?: Object) {
    return this.apiCall.get('users/' + userId + '/jobs', additionOptions)
      .then(response => map(response.data, data => new Application(data)));
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
