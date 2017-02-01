import { Injectable, EventEmitter } from '@angular/core';
import {User} from '../models/user';
import {DataStore} from './data-store.service';

@Injectable()
export class UserManager {
  private storageAuthorizationData: string = 'authorizationData';
  private user: User;
  private userChange: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private dataStore: DataStore
  ) { }

  public getUserId() {
    let authorizationData = this.dataStore.get(this.storageAuthorizationData);
    return authorizationData && authorizationData.user_id;
  }

  public saveAuthorizationData(data) {
    this.dataStore.set(this.storageAuthorizationData, data);
  }

  public deleteUser() {
    this.user = null;
    this.dataStore.remove(this.storageAuthorizationData);
    this.userChange.emit(null);
  }

  public saveUser(user: User) {
    this.user = user;
  }

  public getUser(): User {
    return this.user;
  }

  public getUserRole() {
    return this.user && this.user.role;
  }

  public getCompanyId() {
    if (!this.user || !this.user.company) {
      return null;
    }

    return this.user.company.id;
  }

  public getUserChangeEmmiter(): EventEmitter<User> {
    return this.userChange;
  }
}
