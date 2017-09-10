import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {InputErrorsComponent} from '../../form-errors/input-errors/input-errors.component';
import {Language} from '../../../models/api-models/language/language';
import {Occupation} from '../../../models/api-models/occupation/occupation';
import {OccupationProxy} from '../../../proxies/occupation/occupation.proxy';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {ViewChild} from '@angular/core';

@Component({
  selector: 'primary-occupations-input',
  template: `
  <div class="ui form">
    <basic-loader
      [promise]="occupations"
      class="inverted">
    </basic-loader>
    <div
      [ngClass]="{'error': inputErrors.hasErrors()}"
      [style.text-align]="systemLanguage.direction === 'ltr' ? 'left' : 'right'"
      class="field">
      <basic-text
        [text]="'text'"
        *ngIf="label"
        fontSize="small"
        fontWeight="bold"
        marginBottom="20px"
        marginTop="0">
      </basic-text>
      <custom-radio-button-input
        *ngFor="let occupation of occupations | async"
        [control]="control"
        [label]="occupation.translatedText.name"
        [name]="'occupation'"
        value="yes">
      </custom-radio-button-input>
      <input-errors
        apiAttribute="occupation_ids"
        [apiErrors]="apiErrors"
        [control]="control">
      </input-errors>
      <input-hint-label [hint]="hint"></input-hint-label>
    </div>
  </div>`
})
export class PrimaryOccupationsInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;
  @ViewChild(InputErrorsComponent) inputErrors: InputErrorsComponent;

  public occupations: Promise<Occupation[]>;

  public constructor(
    private occupationProxy: OccupationProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit(): void {
    this.loadData();
  }

  public systemLanguageChanged(systemLanguage: Language): void {
    this.loadData();
  }

  private loadData() {
    this.occupations = this.occupationProxy.getOccupations().then(res => {
      console.log(res);
      return res;
    });
  }
}
