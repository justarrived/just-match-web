import {StorageInterface} from '../storage-interface/storage-interface';

export class CookieStorage implements StorageInterface {
  private data: any = {};
  private DOM: any;

  constructor(
    document: any
  ) {
    this.DOM = document;

    // initialise if there's already data
    this.data = this.getCookieData('localStorage') || {};
  }

  public clear(): void {
    this.data = {};
    this.clearCookieData('localStorage');
  }

  public getItem(key: string): string {
    return this.data[key] === undefined ? null : this.data[key];
  }

  public removeItem(key: string): string {
    const oldValue = this.data[key];
    delete this.data[key];

    this.setCookieData('localStorage', this.data);

    return oldValue;
  }

  public setItem(key: string, value: string): void {
    this.data[key] = value;
    this.setCookieData('localStorage', this.data);
  }

  public persistsRefresh(): boolean {
    return true;
  }

  public persistsSession(): boolean {
    return true;
  }

  public supportsCaching(): boolean {
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

    let cookieDomain = ''
    const hostName = this.getHostName();
    if (hostName.includes('justarrived.se')) {
      cookieDomain = "; domain=.justarrived.se";
    } else if (hostName.includes('justarrived.xyz')) {
      cookieDomain = "; domain=.justarrived.xyz";
    }

    this.DOM.cookie = name + '=' + value + expires + cookieDomain + '; path=/';
  }

  private getHostName(): string {
    return this.DOM.location.host;
  }

  private readCookie(name: string) {
    const nameEQ: string = name + '=';
    const cookieParts: Array<string> = this.DOM.cookie.split(';');
    let data: string = null;

    cookieParts.forEach((c: string) => {
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }

      if (c.indexOf(nameEQ) === 0) {
        data = c.substring(nameEQ.length, c.length);
        return;
      }
    });

    return data;
  }

  public setCookieData(cookieName: string, data: any, days: number = 365) {
    data = JSON.stringify(data);
    this.createCookie(cookieName, data, days);
  }

  public clearCookieData(cookieName: string, days: number = 365): void {
    this.createCookie(cookieName, '', days);
  }

  public getCookieData(cookieName: string): any {
    const data = this.readCookie(cookieName);
    return data ? JSON.parse(data) : null;
  }

  private daysToMillis(days: number): number {
    return days * 24 * 60 * 60 * 1000;
  }
}
