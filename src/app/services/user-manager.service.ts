import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {DataStore} from './data-store.service';

@Injectable()
export class UserManager {
  private storageAuthorizationData: string = 'authorizationData';
  private user: User;

  constructor(private DataStore: DataStore) { }

  getUserId() {
    let authorizationData = this.DataStore.getObject(this.storageAuthorizationData);
    return authorizationData && authorizationData.user_id;
  }

  saveAuthorizationData(data) {
    this.DataStore.setObject(this.storageAuthorizationData, data);
  }

  deleteUser() {
    this.user = null;
    this.DataStore.removeObject(this.storageAuthorizationData);
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
