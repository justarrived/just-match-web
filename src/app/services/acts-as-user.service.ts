import {DataStoreService} from './data-store.service';
import {Injectable} from '@angular/core';

@Injectable()
export class ActsAsUserService {
  private readonly storageActAsUserIdKey: string = 'actAsUserId';
  private userId: string = null;

  public constructor(
    private dataStoreService: DataStoreService
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
    this.dataStoreService.set(key, value);
  }

  private getStorage(key) {
    return this.dataStoreService.get(key);
  }
}
