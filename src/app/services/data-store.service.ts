import {Injectable} from '@angular/core';
import {storageTypeAvailable} from '../utils/storage-type-available';

interface StorageInterface {
  getItem(key: string): string;
  setItem(key: string, value: string): void;
  removeItem(key: string): string;
  persistsRefresh(): boolean;
  persistsSession(): boolean;
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
      this.store = new MemoryStorage();
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
