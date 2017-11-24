import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'base-action-button',
  styleUrls: ['./base-action-button.component.scss'],
  template: `
    <button
      [class.arabic-font]="systemLanguage.direction === 'rtl'"
      [class.fluid]="fluid"
      [disabled]="disabled"
      [ngClass]="[kind, size, 'btn']"
      [style.direction]="systemLanguage.direction"
      [style.margin-top]="marginTop"
      [style.margin-bottom]="marginBottom"
      [type]="buttonType">
      <i *ngIf="icon" class="icon {{icon}}"></i>
      {{buttonText}}
    </button>`
})
export class BaseActionButtonComponent extends BaseComponent {
  @Input() public buttonText: string = '';
  @Input() public buttonType: string = 'button'; // One of ['button', 'submit', 'reset']
  @Input() public disabled: boolean = false;
  @Input() public fluid: boolean;
  @Input() public icon: string;
  @Input() public kind: string = 'primary'; // One of ['primary', 'primary-light', 'secondary', 'secondary-light', 'inactive-light', 'inactive-dark']
  @Input() public marginBottom: string = '15px';
  @Input() public marginTop: string = '15px';
  @Input() public size: string = 'medium'; // One of ['tiny', 'small', 'medium', 'large']

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
