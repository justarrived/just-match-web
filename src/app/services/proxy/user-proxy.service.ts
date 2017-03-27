import {ApiCall} from '../api-call.service';
import {Application} from '../../models/api-models/application/application';
import {ApplicationFactory} from '../../models/api-models/application/application'
import {Document} from '../../models/api-models/document/document';
import {DocumentFactory} from '../../models/api-models/document/document';
import {Gender} from '../../models/api-models/gender/gender';
import {GenderFactory} from '../../models/api-models/gender/gender';
import {getDataUrl} from '../../utils/data-url.util';
import {Injectable} from '@angular/core';
import {map} from 'lodash';
import {Status} from '../../models/api-models/status/status';
import {StatusFactory} from '../../models/api-models/status/status';
import {User} from '../../models/api-models/user/user';
import {UserDocument} from '../../models/api-models/user-document/user-document';
import {UserDocumentFactory} from '../../models/api-models/user-document/user-document';
import {UserFactory} from '../../models/api-models/user/user';
import {UserImage} from '../../models/api-models/user-image/user-image';
import {UserImageFactory} from '../../models/api-models/user-image/user-image';

@Injectable()
export class UserProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  public getUser(userId: string, includes?: any): Promise<User> {
    return this.apiCall.get('users/' + userId, includes)
      .then(response => UserFactory.createUser(response.data));
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

  public saveImage(userId, dataUrl: string, category: string): Promise<UserImage> {
    return this.apiCall.post('users/' + userId + '/images', {'image': dataUrl,'category': category})
      .then(response => UserImageFactory.createUserImage(response.data));
  }

  public saveUserDocument(userId, document: Document, category: string): Promise<UserDocument> {
    return this.apiCall.post('users/' + userId + '/documents', {'document_one_time_token': document.oneTimeToken,'category': category})
        .then(response => {
          const userDocument = UserDocumentFactory.createUserDocument(response.data);
          userDocument.document = document;
          return userDocument;
        });
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
