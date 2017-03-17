import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {Country} from '../../../models/country';
import {CountryProxy} from '../../../services/proxy/country-proxy.service';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {SystemLanguageListener} from '../../../resolvers/system-languages/system-languages.resolver';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';

@Component({
  selector: 'country-of-origin-input',
  template: `
    <select-dropdown-input
      [apiErrors]="apiErrors"
      [control]="control"
      [data]="countries | async"
      [label]="'input.country.of.origin.label' | translate"
      [placeholder]="'input.country.of.origin.placeholder' | translate"
      apiAttribute="country_of_origin"
      dataItemLabelProoerty="translated.name"
      dataItemValueProoerty="countryCode">
    </select-dropdown-input>`
})
export class CountryOfOriginInputComponent extends SystemLanguageListener implements OnInit {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;

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
