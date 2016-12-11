import {Injectable} from '@angular/core';
import {storageTypeAvailable} from '../utils/storage-type-available';

import {StorageInterface} from '../utils/storage/storage-interface';
import {CookieStorage} from '../utils/storage/cookie-storage';
import {LocalStorage} from '../utils/storage/local-storage';
import {MemoryStorage} from '../utils/storage/memory-storage';
import {SessionStorage} from '../utils/storage/session-storage';

@Injectable()
export class DataStore {
  private store: StorageInterface;

  constructor() {
    this.store = this.storeFactory();
  }

  clear(): void {
    this.store.clear();
  }

  setObject(key: string, value: any): void {
    this.set(key, JSON.stringify(value));
  }

  getObject(key: string): any {
    const value = this.get(key);
    return value ? JSON.parse(value) : null;
  }

  removeObject(key: string): any {
    const oldValue = this.getObject(key);
    this.remove(key);

    return oldValue;
  }

  persistsRefresh(): boolean {
    return this.store.persistsRefresh();
  }

  persistsSession(): boolean {
    return this.store.persistsSession();
  }

  supportsCaching(): boolean {
    return this.store.supportsCaching();
  }

  private set(key: string, value: string): void {
    this.store.setItem(key, value);
  }

  private get(key: string): string {
    return this.store.getItem(key);
  }

  private remove(key: string): string {
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
