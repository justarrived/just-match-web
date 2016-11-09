import {Injectable} from "@angular/core";
import {ApiCall} from "../api-call.service";
import {Comment} from "../../models/comment";
import {map} from "lodash";

@Injectable()
export class CommentsProxy {

  constructor(private apiCall: ApiCall) {
  }

  getComments(resourceName, resourceId, additionOptions?: Object) {
    return this.apiCall.get(resourceName + '/' + resourceId + '/comments',  additionOptions).then(response => {
      console.log(response.data);

      return {
        data: map(response.data, data => new Comment(data)),
        total: response.total
      };
    });
  }
}
