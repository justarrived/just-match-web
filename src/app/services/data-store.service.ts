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
import { REQUEST } from '../../express-engine';

@Injectable()
export class DataStoreService {
  private store: StorageInterface;
  private cookieStore: CookieStorage;
  private memoryStore: MemoryStorage;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(REQUEST) private request: any,
  ) {
    this.store = this.storeFactory();

    if (isPlatformBrowser(this.platformId) && document) {
      this.cookieStore = new CookieStorage(document);
    }

    this.memoryStore = new MemoryStorage();

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
    const value = this.removeItem(key);
    return value ? JSON.parse(value) : null;
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

  public setCookie(cookieName: string, data: any, days: number = 365): void {
    if (this.supportsCookies()) {
      this.cookieStore.setCookieData(cookieName, data, days);
    } else {
      this.setInMemory(cookieName, data);
    }
  }

  public getCookie(cookieName: string): any {
    if (this.supportsCookies()) {
      return this.cookieStore.getCookieData(cookieName);
    } else {
      return this.getFromMemory(cookieName);
    }
  }

  public removeCookie(cookieName: string): any {
    if (this.supportsCookies()) {
      const oldValue = this.cookieStore.getCookieData(cookieName);
      this.cookieStore.clearCookieData(cookieName);

      return oldValue;
    } else {
      return this.removeFromMemory(cookieName);
    }
  }

  public supportsCookies(): boolean {
    return !!this.cookieStore;
  }

  public setInMemory(key: string, value: any): void {
    this.memoryStore.setItem(key, JSON.stringify(value));
  }

  public getFromMemory(key: string): any {
    const value = this.memoryStore.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  public removeFromMemory(key: string): any {
    const value = this.memoryStore.removeItem(key);
    return value ? JSON.parse(value) : null;
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
