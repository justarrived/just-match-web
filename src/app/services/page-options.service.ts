import {EventEmitter} from '@angular/core';
import {Injectable} from '@angular/core';

@Injectable()
export class PageOptionsService {
  private _transparentNavbarWhenTopScrolled: boolean = false;
  private transparentNavbarWhenTopScrolledChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public setTransparentNavbarWhenTopScrolled(option: boolean) {
    setTimeout(() => {
      this._transparentNavbarWhenTopScrolled = option;
      this.transparentNavbarWhenTopScrolledChange.emit(this._transparentNavbarWhenTopScrolled);
    }, 1);
  }

  public transparentNavbarWhenTopScrolled(): boolean {
    return this._transparentNavbarWhenTopScrolled;
  }

  public getTransparentNavbarWhenTopScrolledChangeEmitter(): EventEmitter<boolean>  {
    return this.transparentNavbarWhenTopScrolledChange;
  }
}
