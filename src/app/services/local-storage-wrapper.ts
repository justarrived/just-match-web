import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageWrapper {

  public localStorage: any;

  constructor() {
    if (!localStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.localStorage = localStorage;
  }

  public set(key: string, value: string): void {
    this.localStorage[key] = value;
  }

  public get(key: string): string {
    return this.localStorage[key];
  }

  public setObject(key: string, value: any): void {
    this.localStorage[key] = JSON.stringify(value);
  }

  public getObject(key: string): any {
    let storageValue = this.localStorage[key];
    return storageValue ? JSON.parse(storageValue) : null;
  }

  public remove(key: string): any {
    this.localStorage.removeItem(key);
  }

}
