import {CookieStorage} from '../storage/cookie-storage/cookie-storage';
import {Inject} from '@angular/core';
import {Injectable} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {LocalStorage} from '../storage/local-storage/local-storage';
import {MemoryStorage} from '../storage/memory-storage/memory-storage';
import {PLATFORM_ID} from '@angular/core';
import {SessionStorage} from '../storage/session-storage/session-storage';
import {StorageInterface} from '../storage/storage-interface/storage-interface';
import {storageTypeAvailable} from '../utils/storage-type-available/storage-type-available.util';

@Injectable()
export class DataStoreService {
  private store: StorageInterface;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
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
    } else if (isPlatformBrowser(this.platformId) && document) {
      return new CookieStorage(document);
    } else {
      return new MemoryStorage();
    }
  }
}
