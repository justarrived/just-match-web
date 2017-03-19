import {DataStore} from './data-store.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ActsAsUser {
  private readonly storageActAsUserIdKey: string = 'actAsUserId';
  private userId: string = null;

  public constructor(
    private dataStore: DataStore
  ) {
    this.userId = this.getStorage(this.storageActAsUserIdKey);
  }

  public setUserId(userId: string) {
    this.userId = userId;
    this.setStorage(this.storageActAsUserIdKey, userId);
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
