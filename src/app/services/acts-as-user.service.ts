import {Injectable} from '@angular/core';
import {LocalStorageWrapper} from './local-storage-wrapper.service';

const storageActAsUserIdKey: string = 'actAsUserId';

@Injectable()
export class ActsAsUser {
  private userId: string = null;

  constructor(private localStorageWrapper: LocalStorageWrapper) {
    this.userId = this.getStorage(storageActAsUserIdKey);
  }

  public setUserId(userId: string) {
    this.userId = userId;
    this.setStorage(storageActAsUserIdKey, userId);
  }

  public getUserId() {
    return this.userId;
  }

  private setStorage(key, value) {
    this.localStorageWrapper.setObject(key, value);
  }

  private getStorage(key) {
    return this.localStorageWrapper.getObject(key);
  }
}
