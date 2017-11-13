import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';
import {Inject} from '@angular/core';
import {REQUEST} from '@nguniversal/express-engine/tokens';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'share-section',
  styleUrls: ['./share-section.component.scss'],
  template: `
    <div class="ui basic center aligned segment">
      <a [href]="'https://www.facebook.com/sharer/sharer.php?u=' + url" target="_blank" rel="noopener">
        <i class="share-icon facebook-share-icon"></i>
      </a>
      <a [href]="'https://web.whatsapp.com/send?text=' + url" target="_blank" rel="noopener" data-action="share/whatsapp/share">
        <i class="share-icon whatsapp-share-icon"></i>
      </a>
    </div>`
})
export class ShareSectionComponent extends BaseComponent {
  public url: string;

  public constructor (
    @Inject(DOCUMENT) private document: any,
    @Inject(REQUEST) private request: any,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    if (this.request) {
      this.url = this.request.protocol + '://' + this.request.headers.host + this.request.url;
    } else {
      this.url = this.document.location.href;
    }
  }
}
