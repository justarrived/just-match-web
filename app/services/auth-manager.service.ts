import {Injectable} from '@angular/core';
import {LocalStorageWrapper} from './local-storage-wrapper';

@Injectable()
export class AuthManager {
  private userStorageKey: string = 'loggedinUser';
  private user: any;


  constructor(private localStorageWrapper: LocalStorageWrapper) {
    this.user = localStorageWrapper.getObject(this.userStorageKey);
  }

  isUserLoggedin(): boolean {
    return !!this.user;
  }
}
