import {ApiCallService} from '../../services/api-call.service';
import {UserDocument} from '../../models/api-models/user-document/user-document';
import {UserDocumentFactory} from '../../models/api-models/user-document/user-document';
import {Injectable} from '@angular/core';

// CREATE
interface CreateUserDocumentAttributes {
  category: string;
  document_one_time_token: string;
}

@Injectable()
export class UserDocumentProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getUserDocuments(userId: string, searchParameters?: any): Promise<UserDocument[]> {
    return this.apiCallService.get('users/' + userId + '/documents', searchParameters)
    .then(response => response.data.map(userDocument => UserDocumentFactory.createUserDocument(userDocument)));
  }

  public getUserDocumentsWithMeta(userId: string, searchParameters?: any): Promise<{userDocuments: UserDocument[], meta: {total: number}}> {
    return this.apiCallService.get('users/' + userId + '/documents', searchParameters)
    .then(response => {
      return {
        userDocuments: response.data.map(userDocument => UserDocumentFactory.createUserDocument(userDocument)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createUserDocument(userId: string, userDocumentAttributes: CreateUserDocumentAttributes, searchParameters?: any): Promise<UserDocument> {
    return this.apiCallService.post('users/' + userId + '/documents', userDocumentAttributes, searchParameters)
    .then(response => UserDocumentFactory.createUserDocument(response.data));
  }
}
