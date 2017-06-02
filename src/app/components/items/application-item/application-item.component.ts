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
      <div class="date-container">
        <basic-title-text
          [alwaysLtrText]="true"
          [uppercase]="true"
          [text]="application.job.jobDate | date: 'MMM'"
          fontWeight="light"
          color="gray"
          fontSize="medium"
          marginTop="0"
          marginBottom="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
        <basic-title-text
          [alwaysLtrText]="true"
          [uppercase]="true"
          [text]="application.job.jobDate | date: 'dd'"
          fontWeight="light"
          color="gray"
          fontSize="medium"
          marginTop="0"
          marginBottom="0"
          textAlignmentLtr="center"
          textAlignmentRtl="center">
        </basic-title-text>
      </div>
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
          *ngIf="!application.accepted && !application.willPerform"
          [uppercase]="true"
          [text]="'confirmation.applied.for.job.title' | translate"
          fontWeight="bold"
          color="pink"
          marginBottom="0">
        </basic-text>
        <basic-text
          *ngIf="application.accepted && !application.willPerform"
          [uppercase]="true"
          [text]="'assignment.status.user_company_hire' | translate"
          color="pink"
          marginBottom="0">
        </basic-text>
        <basic-text
          *ngIf="application.willPerform && !application.jobEnded"
          [uppercase]="true"
          [text]="'assignment.status.you_hired' | translate"
          color="pink"
          marginBottom="0">
        </basic-text>
        <basic-text
          *ngIf="application.willPerform && application.jobEnded"
          [uppercase]="true"
          [text]="'assignment.status.performed' | translate"
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
