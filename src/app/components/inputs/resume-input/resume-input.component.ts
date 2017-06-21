import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'resume-input',
  template: `
  <user-document-card-input
    [centered]="centered"
    [header]="'input.resume.header' | translate"
    [hint]="hint"
    [label]="'input.resume.label' | translate"
    [maxNbrDocuments]="1"
    [showLabel]="showLabel"
    documentsField="cvDocuments"
    documentType="cv">
  </user-document-card-input>
  `
})
export class ResumeInputComponent extends BaseComponent {
  @Input() public centered: boolean;
  @Input() public hint: string;
  @Input() public showLabel: boolean;

  public constructor(
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }
}
