import {Injectable} from "@angular/core";
import {ApiCall} from "./api-call.service";
import {LocalStorageWrapper} from "./local-storage-wrapper.service";
import {User} from "../models/user";
import {UserProxy} from "./user-proxy.service";

@Injectable()
export class AuthManager {
  private storageAuthorizationData: string = 'authorizationData';
  private user: User;

  constructor(private apiCall: ApiCall, private localStorageWrapper: LocalStorageWrapper, private userProxy: UserProxy) {
  }

  isUserLoggedin(): boolean {
    return !!this.user;
  }

  logUser(email: string, password: string) {
    return this.apiCall.post('users/sessions', {
      "email-or-phone": email,
      "password": password
    }).then(response => {
        let data = response.data;
        this.localStorageWrapper.setObject(this.storageAuthorizationData, data);
        return this.userProxy.getUser(data['user-id']);
      })
      .then(response => {
        return this.handleUserResult(response.data);
      });
  }

  authenticateIfNeeded(): Promise<User> {
    let authorizationData = this.localStorageWrapper.getObject(this.storageAuthorizationData);
    if (authorizationData) {
      return this.userProxy.getUser(authorizationData['user-id']).then(response => {
        return this.handleUserResult(response.data);
      });
    }

    return Promise.resolve(null);
  }

  logoutUser() {
    this.user = null;
    this.localStorageWrapper.remove(this.storageAuthorizationData);
  }

  private handleUserResult(data) {
    this.user = new User(data);
    return Promise.resolve(this.user);
  }
}
