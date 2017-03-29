import {ApiCallService} from '../../services/api-call.service';
import {UserImage} from '../../models/api-models/user-image/user-image';
import {UserImageFactory} from '../../models/api-models/user-image/user-image';
import {Injectable} from '@angular/core';

// CREATE
interface CreateUserImageAttributes {
  category: string;
  image: string;
}

@Injectable()
export class UserImageProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getUserImage(userId: string, userImageId: string, searchParameters?: any): Promise<UserImage> {
    return this.apiCallService.get('users/' + userId + '/images/' + userImageId, searchParameters)
    .then(response => UserImageFactory.createUserImage(response.data));
  }

  // CREATE
  public createUserImage(userId: string, userImageAttributes: CreateUserImageAttributes): Promise<UserImage> {
    return this.apiCallService.post('users/' + userId + '/images', userImageAttributes)
    .then(response => UserImageFactory.createUserImage(response.data));
  }
}
