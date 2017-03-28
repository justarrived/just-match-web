import {ApiCall} from '../../services/api-call.service';
import {UserImageCategory} from '../../models/api-models/user-image-category/user-image-category';
import {UserImageCategoryFactory} from '../../models/api-models/user-image-category/user-image-category';
import {Injectable} from '@angular/core';

@Injectable()
export class UserImageCategoryProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  // GET
  public getUserImageCategories(searchParameters?: any): Promise<UserImageCategory[]> {
    return this.apiCall.get('users/images/categories', searchParameters)
    .then(response => response.data.map(userImageCategory => UserImageCategoryFactory.createUserImageCategory(userImageCategory)));
  }

  public getUserImageCategoriesWithMeta(searchParameters?: any): Promise<{userImageCategories: UserImageCategory[], meta: {total: number}}> {
    return this.apiCall.get('users/images/categories', searchParameters)
    .then(response => {
      return {
        userImageCategories: response.data.map(userImageCategory => UserImageCategoryFactory.createUserImageCategory(userImageCategory)),
        meta: response.meta
      }
    });
  }
}
