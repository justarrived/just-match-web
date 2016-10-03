import { Injectable } from '@angular/core';
import {ApiCall} from "./api-call";

@Injectable()
export class UserProxy {

    constructor(private apiCall: ApiCall) { }

    getUser(userId: String, includes?: Object) {
      return this.apiCall.get('users/' + userId, includes);
    }

}
