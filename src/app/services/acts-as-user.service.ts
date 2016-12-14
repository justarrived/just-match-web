import {Injectable} from '@angular/core';
import {DataStore} from './data-store.service';

const storageActAsUserIdKey: string = 'actAsUserId';

@Injectable()
export class ActsAsUser {
  private userId: string = null;

  constructor(private dataStore: DataStore) {
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
    this.dataStore.set(key, value);
  }

  private getStorage(key) {
    return this.dataStore.get(key);
  }
}
