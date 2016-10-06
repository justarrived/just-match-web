import { Injectable } from '@angular/core';
import {ApiCall} from "./api-call.service";

@Injectable()
export class UserProxy {

    constructor(private apiCall: ApiCall) { }

    getUser(userId: String, includes?: Object): Promise<any> {
      return this.apiCall.get('users/' + userId, includes);
    }

    getStatuses(): Promise<any> {
      return this.apiCall.get('users/statuses');
    }
}
