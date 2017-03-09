import {ApiErrors} from '../../../models/api-errors';
import {Component} from '@angular/core';
import {Country} from '../../../models/country';
import {CountryProxy} from '../../../services/proxy/country-proxy.service';
import {FormControl} from '@angular/forms';
import {Input} from '@angular/core';
import {OnInit} from '@angular/core';
import {TranslationListener} from '../../translation.component';
import {TranslationService} from '../../../services/translation.service';

@Component({
  selector: 'country-of-origin-input',
  template: `
    <select-dropdown-input
      [apiErrors]="apiErrors"
      [control]="control"
      [data]="countries | async | orderBy: 'translated.name'"
      [label]="'input.country.of.origin.label' | translate"
      [placeholder]="'input.country.of.origin.placeholder' | translate"
      apiAttribute="country_of_origin"
      dataItemLabelProoerty="translated.name"
      dataItemValueProoerty="countryCode">
    </select-dropdown-input>`
})
export class CountryOfOriginInputComponent extends TranslationListener implements OnInit {
  @Input() apiErrors: ApiErrors;
  @Input() control: FormControl;

  public countries: Promise<Country[]>;

  constructor(
    private countryProxy: CountryProxy,
    protected translationService: TranslationService
  ) {
    super(translationService);
  }

  public ngOnInit(): void {
    this.loadData();
  }

  protected loadData() {
    this.countries = this.countryProxy.getCountries();
  }
}
