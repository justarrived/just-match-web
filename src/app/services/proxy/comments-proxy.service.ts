import {Injectable} from '@angular/core';
import {ApiCall} from '../api-call.service';
import {Comment} from '../../models/api-models/comment/comment';
import {CommentFactory} from '../../models/api-models/comment/comment';
import {map} from 'lodash';

@Injectable()
export class CommentsProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  public getComments(resourceName, resourceId, additionOptions?: any) {
    return this.apiCall.get(resourceName + '/' + resourceId + '/comments',  additionOptions).then(response => {
      return {
        data: map(response.data, data => CommentFactory.createComment(data)),
        total: response.total
      };
    });
  }

  public sendComment(resourceName, resourceId, commentData) {
    return this.apiCall.post(resourceName + '/' + resourceId + '/comments', commentData);
  }
}
