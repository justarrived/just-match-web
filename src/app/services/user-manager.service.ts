import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {DataStore} from './data-store.service';

@Injectable()
export class UserManager {
  private storageAuthorizationData: string = 'authorizationData';
  private user: User;

  constructor(private dataStore: DataStore) { }

  getUserId() {
    let authorizationData = this.dataStore.get(this.storageAuthorizationData);
    return authorizationData && authorizationData.user_id;
  }

  saveAuthorizationData(data) {
    this.dataStore.set(this.storageAuthorizationData, data);
  }

  deleteUser() {
    this.user = null;
    this.dataStore.remove(this.storageAuthorizationData);
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
