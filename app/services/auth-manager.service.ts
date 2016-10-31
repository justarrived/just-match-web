import {Injectable} from "@angular/core";
import {LocalStorageWrapper} from "./local-storage-wrapper.service";
import {User} from "../models/user";
import {UserProxy} from "./user-proxy.service";

@Injectable()
export class AuthManager {
  private storageAuthorizationData: string = 'authorizationData';
  private user: User;

  constructor(private localStorageWrapper: LocalStorageWrapper, private userProxy: UserProxy) {
  }

  isUserLoggedin(): boolean {
    return !!this.user;
  }

  isCompanyUser(): boolean {
    return !!this.user && this.user.role === 'company';
}

  logUser(email: string, password: string) {
    this.userProxy.getUserSession(email, password).then(response => {
        let data = response.data;
        this.localStorageWrapper.setObject(this.storageAuthorizationData, data);
        return this.userProxy.getUser(data['user_id']);
      })
      .then(response => {
        return this.handleUserResult(response.data);
      });
  }

  authenticateIfNeeded(): Promise<User> {
    let authorizationData = this.localStorageWrapper.getObject(this.storageAuthorizationData);
    if (authorizationData) {
      return this.userProxy.getUser(authorizationData['user_id'], {include: 'user_images,user_languages'}).then(response => { // TODO: add user_languages.language in the include
        return this.handleUserResult(response.data);
      });
    }

    return Promise.resolve(null);
  }

  logoutUser() {
    this.user = null;
    this.localStorageWrapper.remove(this.storageAuthorizationData);
  }

  getUser() {
    return this.user;
  }

  getUserRole() {
    return this.user && this.user.role;
  }

  getUser() {
    return this.user;
  }

  handleUserResult(data) {
    this.user = new User(data);
    return Promise.resolve(this.user);
  }
}
