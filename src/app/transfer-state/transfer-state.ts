import {Injectable} from '@angular/core';

@Injectable()
export class TransferState {
  private _map = new Map<string, any>();

  public keys() {
    return this._map.keys();
  }

  public get(key: string): any {
    return this._map.get(key);
  }

  public set(key: string, value: any): Map<string, any> {
    return this._map.set(key, value);
  }

  public toJson(): any {
    const obj = {};
    Array.from(this.keys())
      .forEach(key => {
        obj[key] = this.get(key);
      });
    return obj;
  }

  public initialize(obj: any): void {
    Object.keys(obj)
      .forEach(key => {
        this.set(key, obj[key]);
      });
  }

  public inject(): void {}
}
