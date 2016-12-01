import {Injectable} from "@angular/core";
import {storageTypeAvailable} from "../utils/storage-type-available";

interface StorageInterface {
  getItem(key: string): string;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

class MemoryStorage implements StorageInterface {
  private items: Object = {};

  public setItem(key: string, value: string): void {
    this.items[key] = value;
  }

  public getItem(key: string): string {
    return this.items[key];
  }

  public removeItem(key: string): void {
    this.setItem(key, null);
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

  public removeItem(key: string): void {
    this.store.removeItem(key);
  }
}

@Injectable()
export class LocalStorageWrapper {

  public store: any;

  constructor() {
    if (storageTypeAvailable('localStorage')) {
      this.store = new LocalStorage(localStorage);
    } else {
      this.store = new MemoryStorage();
      console.error('Current browser does not support Local Storage');
    }
  }

  public set(key: string, value: string): void {
    this.store.setItem(key, value);
  }

  public get(key: string): string {
    return this.store.getItem(key);
  }

  public setObject(key: string, value: any): void {
    this.set(key, JSON.stringify(value));
  }

  public getObject(key: string): any {
    const value = this.get(key);
    return value ? JSON.parse(value) : null;
  }

  public remove(key: string): void {
    this.store.removeItem(key);
  }

}
