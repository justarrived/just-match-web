import {Injectable} from '@angular/core';
import {DataStore} from './data-store.service';

const storageActAsUserIdKey: string = 'actAsUserId';

@Injectable()
export class ActsAsUser {
  private userId: string = null;

  constructor(private DataStore: DataStore) {
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
    this.DataStore.setObject(key, value);
  }

  private getStorage(key) {
    return this.DataStore.getObject(key);
  }
}
