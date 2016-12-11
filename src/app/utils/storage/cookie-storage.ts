import {StorageInterface} from './storage-interface';

export class CookieStorage implements StorageInterface {
  private data: Object = {};
  private DOM: any;

  constructor(document: any) {
    this.DOM = document;

    // initialise if there's already data
    this.data = this.getData();
  }

  clear(): void {
    this.data = {};
    this.clearData();
  }

  getItem(key: string): string {
    return this.data[key] === undefined ? null : this.data[key];
  }

  removeItem(key: string): string {
    const oldValue = this.data[key];
    delete this.data[key];

    this.setData(this.data);

    return oldValue;
  }

  setItem(key: string, value: string): void {
    this.data[key] = value;
    this.setData(this.data);
  }

  persistsRefresh(): boolean {
    return true;
  }

  persistsSession(): boolean {
    return true;
  }

  supportsCaching(): boolean {
    return false;
  }

  private createCookie(name: string, value: string, days: number): void {
    let expires;

    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + this.daysToMillis(days));
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

  private daysToMillis(days: number): number {
    return days * 24 * 60 * 60 * 1000;
  }
}
