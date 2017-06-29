import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Component} from '@angular/core';
import {Country} from '../../../models/api-models/country/country';
import {CountryProxy} from '../../../proxies/country/country.proxy';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {Language} from '../../../models/api-models/language/language';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';

@Component({
  selector: 'country-of-origin-input',
  template: `
  <div class="ui form">
    <basic-loader
      [promise]="countries"
      class="inverted">
    </basic-loader>
    <select-dropdown-input
      [apiErrors]="apiErrors"
      [control]="control"
      [data]="countries | async"
      [hint]="hint"
      [label]="'input.country.of.origin.label' | translate"
      [placeholder]="'input.country.of.origin.placeholder' | translate"
      apiAttribute="country_of_origin"
      dataItemLabelProperty="translatedText.name"
      dataItemValueProperty="countryCode">
    </select-dropdown-input>
  </div>`
})
export class CountryOfOriginInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;

  public countries: Promise<Country[]>;

  public constructor(
    private countryProxy: CountryProxy,
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
    this.countries = this.countryProxy.getCountries();
  }
}
