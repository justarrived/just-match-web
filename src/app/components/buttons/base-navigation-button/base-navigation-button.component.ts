import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'base-navigation-button',
  styleUrls: ['./base-navigation-button.component.scss'],
  template: `
    <a
      [angulartics2On]="angulartics2On"
      [angularticsAction]="angularticsAction"
      [angularticsCategory]="angularticsCategory"
      [angularticsLabel]="angularticsLabel"
      [angularticsProperties]="angularticsProperties"
      [angularticsValue]="angularticsValue"
      [class.arabic-font]="systemLanguage.direction === 'rtl'"
      [class.fluid]="fluid"
      [ngClass]="[kind, size, 'btn']"
      [style.direction]="systemLanguage.direction"
      [style.margin-top]="marginTop"
      [style.margin-bottom]="marginBottom"
      [routerLink]="routerLink">
      <i *ngIf="icon" class="icon {{icon}}"></i>
      {{buttonText}}
    </a>`
})
export class BaseNavigationButtonComponent extends BaseComponent {
  @Input() public buttonText: string = '';
  @Input() public fluid: boolean;
  @Input() public icon: string;
  @Input() public kind: string = 'primary'; // One of ['primary', 'primary-light', 'secondary', 'secondary-light', 'inactive-light', 'inactive-dark']
  @Input() public marginBottom: string = '10px';
  @Input() public marginTop: string = '10px';
  @Input() public routerLink: string;
  @Input() public size: string = 'medium'; // One of ['tiny', 'small', 'medium', 'large']

  @Input() public angulartics2On: string;
  @Input() public angularticsAction: string;
  @Input() public angularticsCategory: string;
  @Input() public angularticsLabel: string;
  @Input() public angularticsProperties: any;
  @Input() public angularticsValue: any;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
