import {Injectable} from '@angular/core';
import {storageTypeAvailable} from '../utils/storage-type-available';

interface StorageInterface {
  getItem(key: string): string;
  setItem(key: string, value: string): void;
  removeItem(key: string): string;
  persistsRefresh(): boolean;
  persistsSession(): boolean;
}

class CookieStorage implements StorageInterface {
  private data: Object = {};
  private length: number = 0;
  private DOM: any;

  constructor(document: any) {
    this.DOM = document;

    // initialise if there's already data
    this.data = this.getData();
  }

  public clear(): void {
    this.data = {};
    this.length = 0;
    this.clearData();
  }

  public getItem(key: string): string {
    return this.data[key] === undefined ? null : this.data[key];
  }

  public removeItem(key: string): string {
    const oldValue = this.data[key];
    delete this.data[key];

    this.length--;
    this.setData(this.data);

    return oldValue;
  }

  public setItem(key: string, value: string): void {
    this.data[key] = value;
    this.length++;
    this.setData(this.data);
  }

  public persistsRefresh(): boolean {
    return true;
  }

  public persistsSession(): boolean {
    return true;
  }

  private createCookie(name: string, value: string, days: number): void {
    let expires;

    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    } else {
      expires = '';
    }

    this.DOM.cookie = name + '=' + value + expires + '; path=/';
  }

  private readCookie(name: string) {
    const nameEQ: string = name + '=';
    const cookieParts: Array<string> = this.DOM.cookie.split(';');
    let data: string = null;

    cookieParts.forEach((c: string) => {
      while (c.charAt(0) == ' ') {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) == 0) {
        data = c.substring(nameEQ.length, c.length);
        return;
      }
    });

    return data;
  }

  private setData(data: any) {
    data = JSON.stringify(data);
    this.createCookie('localStorage', data, 365);
  }

  private clearData(): void {
    this.createCookie('localStorage', '', 365);
  }

  private getData(): Object {
    const data = this.readCookie('localStorage');
    return data ? JSON.parse(data) : {};
  }
}

class MemoryStorage implements StorageInterface {
  private items: Object = {};

  public setItem(key: string, value: string): void {
    this.items[key] = value;
  }

  public getItem(key: string): string {
    return this.items[key];
  }

  public removeItem(key: string): string {
    const oldValue = this.getItem(key);
    this.setItem(key, null);

    return oldValue;
  }

  public persistsRefresh(): boolean {
    return false;
  }

  public persistsSession(): boolean {
    return false;
  }
}

class SessionStorage implements StorageInterface {
  private store: any = {};

  constructor(sessionStore: any) {
    this.store = sessionStore;
  }

  public getItem(key: string) {
    return this.store.getItem(key);
  }

  public setItem(key: string, value: string) {
    this.store.setItem(key, value);
  }

  public removeItem(key: string): string {
    const oldValue = this.getItem(key);
    sessionStorage.removeItem(key);

    return oldValue;
  }

  public persistsRefresh(): boolean {
    return true;
  }

  public persistsSession(): boolean {
    return false;
  }
}

class LocalStorage implements StorageInterface {
  private store: any = {};

  constructor(store: any) {
    this.store = store;
  }

  public setItem(key: string, value: string): void {
    this.store.setItem(key, value);
  }

  public getItem(key: string): string {
    return this.store.getItem(key);
  }

  public removeItem(key: string): string {
    const oldValue = this.getItem(key);
    this.store.removeItem(key);

    return oldValue;
  }

  public persistsRefresh(): boolean {
    return true;
  }

  public persistsSession(): boolean {
    return true;
  }
}

@Injectable()
export class DataStore {
  private store: any;

  constructor() {
    if (storageTypeAvailable('localStorage')) {
      this.store = new LocalStorage(localStorage);
    } else if (storageTypeAvailable('sessionStorage')) {
      this.store = new SessionStorage(sessionStorage);
    } else {
      this.store = new CookieStorage(document);
      // this.store = new MemoryStorage();
    }
  }

  public setObject(key: string, value: any): void {
    this.set(key, JSON.stringify(value));
  }

  public getObject(key: string): any {
    const value = this.get(key);
    return value ? JSON.parse(value) : null;
  }

  public removeObject(key: string): any {
    const oldValue = this.getObject(key);
    this.remove(key);

    return oldValue;
  }

  public persistsRefresh(): boolean {
    return this.store.persistsRefresh();
  }

  public persistsSession(): boolean {
    return this.store.persistsSession();
  }

  private set(key: string, value: string): void {
    this.store.setItem(key, value);
  }

  private get(key: string): string {
    return this.store.getItem(key);
  }

  private remove(key: string): string {
    const oldValue = this.store.get(key);
    this.store.removeItem(key);

    return oldValue;
  }
}
