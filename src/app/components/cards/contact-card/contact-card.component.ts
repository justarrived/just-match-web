import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {fadeInAnimation} from '../../../animations/fade-in/fade-in.animation';
import {Input} from '@angular/core';
import {Job} from '../../../models/api-models/job/job';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'contact-card',
  styleUrls: ['./contact-card.component.scss'],
  template: `
  <div class="ui raised card contact-card">
    <div class="header">
      <div class="ui grid">
        <div class="four wide column contact-image-column">
          <img
            class="ui middle aligned tiny image"
            [class.condensed]="condensed"
            [src]="imageUrl">
        </div>
        <div class="twelve wide column">
          {{name}}
          <br />
          <span *ngIf="title" class="meta">
            <span class="date">{{title}}</span>
          </span>
        </div>
      </div>
    </div>
    <div *ngIf="!condensed" class="extra content">
      <a *ngIf="email" [href]="'mailto:' + email">
        <i class="mail icon"></i>
        {{email}}
      </a>

      <br />

      <a *ngIf="phone && phone !== '-'" [href]="'tel:' + phoneHrefFormat">
        <i class="phone icon"></i> {{phone}}
      </a>
      <span *ngIf="phone === '-'">
        <i class="phone icon"></i> {{phone}}
      </span>
    </div>
  </div>
  `
})
export class ContactCardComponent extends BaseComponent {
  @Input() imageUrl: string;
  @Input() name: string;
  @Input() title: string;
  @Input() email: string = '-';
  @Input() phone: string = '-';
  @Input() condensed: boolean = false;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  get phoneHrefFormat(): string {
    if (!this.phone) return null;

    return this.phone.replace(/ /g, '');
  }
}
