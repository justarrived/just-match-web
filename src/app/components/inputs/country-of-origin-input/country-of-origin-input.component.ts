import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {Component} from '@angular/core';
import {Country} from '../../../models/api-models/country/country';
import {CountryProxy} from '../../../proxies/country/country.proxy';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

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
      dataItemLabelProoerty="translatedText.name"
      dataItemValueProoerty="countryCode">
    </select-dropdown-input>
  </div>`
})
export class CountryOfOriginInputComponent extends SystemLanguageListener implements OnInit {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public hint: string;

  public countries: Promise<Country[]>;

  constructor(
    private countryProxy: CountryProxy,
    protected systemLanguagesResolver: SystemLanguagesResolver
  ) {
    super(systemLanguagesResolver);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  protected loadData() {
    this.countries = this.countryProxy.getCountries();
  }
}
