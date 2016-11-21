import { Injectable } from '@angular/core';
import {User} from "./models/user";
import {LocalStorageWrapper} from "./services/local-storage-wrapper.service";

@Injectable()
export class UserManager {
  private storageAuthorizationData: string = 'authorizationData';
  private user: User;

  constructor(private localStorageWrapper: LocalStorageWrapper) { }

  getUserId() {
    let authorizationData = this.localStorageWrapper.getObject(this.storageAuthorizationData);
    return authorizationData && authorizationData.user_id;
  }

  saveAuthorizationData(data) {
    this.localStorageWrapper.setObject(this.storageAuthorizationData, data);
  }

  deleteUser() {
    this.user = null;
    this.localStorageWrapper.remove(this.storageAuthorizationData);
  }

  saveUser(user: User) {
    this.user = user;
  }

  getUser(): User {
    return this.user;
  }

  getUserRole() {
    return this.user && this.user.role;
  }

  isCompanyUser(): boolean {
    return !!this.user && this.user.role === 'company';
  }

  getCompanyId() {
    if (!this.user || !this.user.company) {
      return null;
    }

    return this.user.company.id;
  }
}
