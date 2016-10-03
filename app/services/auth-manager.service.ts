import {Injectable} from "@angular/core";
import {ApiCall} from "./api-call.service";
import {LocalStorageWrapper} from "./local-storage-wrapper.service";
import {User} from "../models/user";
import {UserProxy} from "./user-proxy.service";

@Injectable()
export class AuthManager {
  private storageAuthorizationData: string = 'authorizationData';
  user: User;

  constructor(private apiCall: ApiCall, private localStorageWrapper: LocalStorageWrapper, private userProxy: UserProxy) {
  }

  isUserLoggedin(): boolean {
    return !!this.user;
  }

  logUser(email: string, password: string) {
    return this.apiCall.post('users/sessions', {
      "data": {
        "attributes": {
          "email-or-phone": email,
          "password": password
        }
      }
    }).then(response => {
        var result = response.json().data.attributes;
        this.localStorageWrapper.setObject(this.storageAuthorizationData, result);
        return this.userProxy.getUser(result['user-id']);
      })
      .then(response => {
        return this.handleUserResult(response);
      });
  }

  handleUserResult(response) {
    let userData = response.json().data.attributes;
    this.user = new User(userData);
    return Promise.resolve(this.user);
  }

  authenticateIfNeeded(): Promise<User> {
    let authorizationData = this.localStorageWrapper.getObject(this.storageAuthorizationData);
    if (authorizationData) {
      return this.userProxy.getUser(authorizationData['user-id']).then(response => {
        return this.handleUserResult(response);
      });
    }

    return Promise.resolve(null);
  }

  logoutUser() {
    this.user = null;
  }
}
