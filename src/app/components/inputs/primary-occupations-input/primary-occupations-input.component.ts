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
    <basic-text
      [text]="'input.primary.occupations.label' | translate"
      fontSize="small"
      fontWeight="bold"
      marginBottom="20px"
      marginTop="0">
    </basic-text>
    <div
      [ngClass]="{'error': inputErrors.hasErrors()}"
      [style.text-align]="systemLanguage.direction === 'ltr' ? 'left' : 'right'"
      style="display: flex; flex-wrap: wrap; justify-content: center;"
      class="field">

      <div class="ui centered grid">
        <div *ngFor="let occupation of occupations | async" class="sixteen wide mobile eight wide tablet four wide computer column">
          <custom-checkbox-input
            [checkboxId]="occupation.id"
            [label]="occupation.translatedText.name"
            [name]="'occupation'"
            [resultObject]="resultObject"
            (resultObjectChange)="resultChanged($event)"
            [value]="occupation.id">
          </custom-checkbox-input>
        </div>
      </div>

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
  @Input() public resultObject: any = {};
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

  private loadData(): void {
    this.occupations = this.occupationProxy.getOccupations({
      'filter[parent_id]': '',
      'page[size]': 30
    }).then(occupations => {
      return occupations.sort((occupation1, occupation2) => {
        if(occupation1.translatedText.name < occupation2.translatedText.name) return -1;
        if(occupation1.translatedText.name > occupation2.translatedText.name) return 1;
        return 0;
      });
    });
  }

  public resultChanged(result): void {
    this.resultObject = result;
    this.control.setValue(result);
  }
}
