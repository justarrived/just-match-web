import {Application} from '../../../models/api-models/application/application';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'application-item',
  template: `
    <div
      [routerLink]="JARoutes.job.url([application.job.id])"
      [style.flex-direction]="systemLanguage.direction === 'rtl' ? 'row-reverse' : 'row'"
      class="application-item ui raised segment">
      <div>
        <basic-title-text
          [text]="application.job.translatedText.name"
          color="black"
          fontSize="medium"
          marginTop="0"
          marginBottom="0">
        </basic-title-text>
        <basic-text
          [text]="application.job.street"
          color="gray"
          marginTop="0"
          marginBottom="0">
        </basic-text>
        <basic-text
          *ngIf="application.applicationStatus === 'applied'"
          [uppercase]="true"
          [text]="'application.item.applied' | translate"
          fontWeight="bold"
          color="pink"
          marginBottom="0">
        </basic-text>
        <basic-text
          *ngIf="application.applicationStatus === 'offered'"
          [uppercase]="true"
          [text]="'application.item.offered' | translate"
          fontWeight="bold"
          color="pink"
          marginBottom="0">
        </basic-text>
        <basic-text
          *ngIf="application.applicationStatus === 'hired'"
          [uppercase]="true"
          [text]="'application.item.hired' | translate"
          fontWeight="bold"
          color="pink"
          marginBottom="0">
        </basic-text>
        <basic-text
          *ngIf="application.applicationStatus === 'rejected'"
          [uppercase]="true"
          [text]="'application.item.rejected' | translate"
          fontWeight="bold"
          color="pink"
          marginBottom="0">
        </basic-text>
        <basic-text
          *ngIf="application.applicationStatus === 'withdrawn'"
          [uppercase]="true"
          [text]="'application.item.withdrawn' | translate"
          fontWeight="bold"
          color="pink"
          marginBottom="0">
        </basic-text>
      </div>
    </div>`,
  styleUrls: ['./application-item.component.scss']
})
export class ApplicationItemComponent extends BaseComponent {
  @Input() public application = null as Application;

  public constructor (
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
