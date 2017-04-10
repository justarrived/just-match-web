import {ApiCallService} from '../../services/api-call.service';
import {Comment} from '../../models/api-models/comment/comment';
import {CommentFactory} from '../../models/api-models/comment/comment';
import {Injectable} from '@angular/core';

// CREATE
interface CreateCommentAttributes {
  body: string;
  commentable_id: string;
  commentable_type: string;
  language_id: string;
}

// UPDATE
interface UpdateCommentAttributes {
  body?: string;
}

@Injectable()
export class CommentProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getComment(resourceName: string, resourceId: string, commentId: string, searchParameters?: any): Promise<Comment> {
    return this.apiCallService.get(resourceName + '/' + resourceId + '/comments/' + commentId, searchParameters)
    .then(response => CommentFactory.createComment(response.data));
  }

  public getComments(resourceName: string, resourceId: string, searchParameters?: any): Promise<Comment[]> {
    return this.apiCallService.get(resourceName + '/' + resourceId + '/comments', searchParameters)
    .then(response => response.data.map(comment => CommentFactory.createComment(comment)));
  }

  public getCommentsWithMeta(resourceName: string, resourceId: string, searchParameters?: any): Promise<{comments: Comment[], meta: any}> {
    return this.apiCallService.get(resourceName + '/' + resourceId + '/comments', searchParameters)
    .then(response => {
      return {
        comments: response.data.map(comment => CommentFactory.createComment(comment)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createComment(resourceName: string, resourceId: string, commentAttributes: CreateCommentAttributes, searchParameters?: any): Promise<Comment> {
    return this.apiCallService.post(resourceName + '/' + resourceId + '/comments', commentAttributes, searchParameters)
    .then(response => CommentFactory.createComment(response.data));
  }

  // UPDATE
  public updateComment(resourceName: string, resourceId: string, commentId: string, commentAttributes: UpdateCommentAttributes, searchParameters?: any): Promise<Comment> {
    return this.apiCallService.patch(resourceName + '/' + resourceId + '/comments/' + commentId, commentAttributes, searchParameters)
    .then(response => CommentFactory.createComment(response.data));
  }

  // REMOVE
  public removeComment(resourceName: string, resourceId: string, commentId: string): Promise<any> {
    return this.apiCallService.delete(resourceName + '/' + resourceId + '/comments/' + commentId);
  }
}
