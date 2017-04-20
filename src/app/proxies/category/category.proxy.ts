import {ApiCallService} from '../../services/api-call.service';
import {Category} from '../../models/api-models/category/category';
import {CategoryFactory} from '../../models/api-models/category/category';
import {Injectable} from '@angular/core';

@Injectable()
export class CategoryProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getCategory(categoryId: string, searchParameters?: any): Promise<Category> {
    return this.apiCallService.get('categories/' + categoryId, searchParameters)
    .then(response => CategoryFactory.createCategory(response.data));
  }

  public getCategories(searchParameters?: any): Promise<Category[]> {
    return this.apiCallService.get('categories', searchParameters)
    .then(response => response.data.map(category => CategoryFactory.createCategory(category)));
  }

  public getCategoriesWithMeta(searchParameters?: any): Promise<{categories: Category[], meta: any}> {
    return this.apiCallService.get('categories', searchParameters)
    .then(response => {
      return {
        categories: response.data.map(category => CategoryFactory.createCategory(category)),
        meta: response.meta
      }
    });
  }
}
