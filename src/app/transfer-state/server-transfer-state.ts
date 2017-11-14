import {Injectable} from '@angular/core';
import {Optional} from '@angular/core';
import {PlatformState} from '@angular/platform-server';
import {RendererFactory2} from '@angular/core';
import {TransferState} from './transfer-state';
import {ViewEncapsulation} from '@angular/core';

@Injectable()
export class ServerTransferState extends TransferState {

  constructor(
    private state: PlatformState,
    private rendererFactory: RendererFactory2
  ) {
    super();
  }

  /**
   * Inject the State into the bottom of the <head>
   */
  public inject(): void {
    try {
      const document: any = this.state.getDocument();
      const transferStateString = JSON.stringify(this.toJson());
      const renderer = this.rendererFactory.createRenderer(document, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {}
      });

      const head = document.head;
      if (head.localName !== 'head') {
        throw new Error('Please have <head> as the first element in your document');
      }

      const script = renderer.createElement('script');
      renderer.setValue(script, `window['TRANSFER_STATE'] = ${transferStateString}`);
      renderer.appendChild(head, script);
    } catch (e) {
      console.error(e);
    }
  }
}
