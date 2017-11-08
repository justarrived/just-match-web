import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {EmailSuggestion} from '../../../models/api-models/email-suggestion/email-suggestion';
import {EmailSuggestionProxy} from '../../../proxies/email-suggestion/email-suggestion.proxy';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'email-or-phone-input',
  template: `
  <text-input
    [apiErrors]="apiErrors"
    [control]="control"
    [hint]="hint"
    [label]="'input.email.or.phone.label' | translate"
    [placeholder]="'input.email.or.phone.placeholder' | translate"
    apiAttribute="email_or_phone"
    icon="pink mail">
  </text-input>
  <input-hint-label
    *ngIf="(emailSuggestion | async)?.full"
    [hint]="'input.email.or.phone.suggestion.hint' | translate: { email: (emailSuggestion | async)?.full }">
    <basic-link
      (click)="applyEmailSuggestion()"
      [text]="'input.email.or.phone.suggestion.link' | translate"
      [color]="hovered ? 'pink' : 'white'"
      marginTop="0.5rem"
      marginBottom="0"
      textAlignmentLtr="center"
      textAlignmentRtl="center">
    </basic-link>
  </input-hint-label>
  `
})
export class EmailOrPhoneInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
  @Input() public suggestionFrequency: number = 500;

  public emailSuggestion: Promise<EmailSuggestion>;

  public constructor(
    private emailSuggestionProxy: EmailSuggestionProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public afterViewInit(): void {
    this.control
      .valueChanges
      .distinctUntilChanged()
      .debounceTime(this.suggestionFrequency)
      .subscribe((emailString: string) => {
        this.emailSuggestion = this.emailSuggestionProxy.createEmailSuggestion({
          email: emailString
        });
      });
  }

  public async applyEmailSuggestion() {
    let suggestion = await this.emailSuggestion;
    this.control.setValue(suggestion.full);
  }
}
