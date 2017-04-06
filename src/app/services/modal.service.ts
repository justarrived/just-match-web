import {Injectable} from '@angular/core';
import {EventEmitter} from '@angular/core';

@Injectable()
export class ModalService {

  private hideModalEmitter: EventEmitter<{modal: string}> = new EventEmitter<{modal: string}>();
  private modalResultEmitter: EventEmitter<any> = new EventEmitter<any>();
  private showModalEmitter: EventEmitter<{modal: string, navigate: boolean, delay: number, args: any[]}> = new EventEmitter<{modal: string, navigate: boolean, delay: number, args: any[]}>();

  public constructor(
  ) {
  }

  public showModal(modal: string, navigate: boolean, expectsResult: boolean, delay: number, ...args: any[]): Promise<any> {
    this.showModalEmitter.emit({
      args: args,
      delay: delay,
      modal: modal,
      navigate: navigate,
    });

    this.modalResultEmitter = new EventEmitter<{modal: string, result: any}>();

    if (expectsResult) {
      return new Promise((resolve, reject) => {
        this.modalResultEmitter.subscribe(result => {
          this.modalResultEmitter.unsubscribe();
          resolve(result);
        });
      });
    }

    return Promise.resolve(null);
  }

  public hideModal(modal: string): void {
    this.hideModalEmitter.emit({
      modal: modal
    });
  }

  public getShowModalEmitter(): EventEmitter<{modal: string, navigate: boolean, args: any[]}> {
    return this.showModalEmitter;
  }

  public getHideModalEmitter(): EventEmitter<{modal: string}> {
    return this.hideModalEmitter;
  }

  public modalResult(result: any) {
    this.modalResultEmitter.emit(result);
  }
}
