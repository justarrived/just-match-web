import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {User} from '../../../models/api-models/user/user';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'personal-letter-input',
  template: `
  <user-document-card-input
    [centered]="centered"
    [header]="'input.personal.letter.header' | translate"
    [hint]="hint"
    [label]="'input.personal.letter.label' | translate"
    [maxNbrDocuments]="1"
    [showLabel]="showLabel"
    documentsField="personalLetterDocuments"
    documentType="personal_letter">
  </user-document-card-input>
  `
})
export class PersonalLetterInputComponent extends BaseComponent {
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
