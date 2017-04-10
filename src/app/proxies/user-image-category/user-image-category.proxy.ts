import {ApiCallService} from '../../services/api-call.service';
import {UserImageCategory} from '../../models/api-models/user-image-category/user-image-category';
import {UserImageCategoryFactory} from '../../models/api-models/user-image-category/user-image-category';
import {Injectable} from '@angular/core';

@Injectable()
export class UserImageCategoryProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getUserImageCategories(searchParameters?: any): Promise<UserImageCategory[]> {
    return this.apiCallService.get('users/images/categories', searchParameters)
    .then(response => response.data.map(userImageCategory => UserImageCategoryFactory.createUserImageCategory(userImageCategory)));
  }

  public getUserImageCategoriesWithMeta(searchParameters?: any): Promise<{userImageCategories: UserImageCategory[], meta: any}> {
    return this.apiCallService.get('users/images/categories', searchParameters)
    .then(response => {
      return {
        userImageCategories: response.data.map(userImageCategory => UserImageCategoryFactory.createUserImageCategory(userImageCategory)),
        meta: response.meta
      }
    });
  }
}
