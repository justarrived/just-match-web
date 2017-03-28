import {Injectable} from '@angular/core';
import {storageTypeAvailable} from '../utils/storage-type-available';

import {StorageInterface} from '../utils/storage/storage-interface';
import {CookieStorage} from '../utils/storage/cookie-storage';
import {LocalStorage} from '../utils/storage/local-storage';
import {MemoryStorage} from '../utils/storage/memory-storage';
import {SessionStorage} from '../utils/storage/session-storage';

@Injectable()
export class DataStoreService {
  private store: StorageInterface;

  constructor(
  ) {
    this.store = this.storeFactory();
  }

  public clear(): void {
    this.store.clear();
  }

  public set(key: string, value: any): void {
    this.setItem(key, JSON.stringify(value));
  }

  public get(key: string): any {
    const value = this.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  public remove(key: string): any {
    const oldValue = this.get(key);
    this.removeItem(key);

    return oldValue;
  }

  public persistsRefresh(): boolean {
    return this.store.persistsRefresh();
  }

  public persistsSession(): boolean {
    return this.store.persistsSession();
  }

  public supportsCaching(): boolean {
    return this.store.supportsCaching();
  }

  private setItem(key: string, value: string): void {
    this.store.setItem(key, value);
  }

  private getItem(key: string): string {
    return this.store.getItem(key);
  }

  private removeItem(key: string): string {
    return this.store.removeItem(key);
  }

  private storeFactory(): StorageInterface {
    if (storageTypeAvailable('localStorage')) {
      return new LocalStorage(localStorage);
    } else if (storageTypeAvailable('sessionStorage')) {
      return new SessionStorage(sessionStorage);
    } else if (document) {
      return new CookieStorage(document);
    } else {
      return new MemoryStorage();
    }
  }
}
