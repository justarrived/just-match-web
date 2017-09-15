import {} from 'googlemaps';
import {ApiErrors} from '../../../models/api-models/api-errors/api-errors';
import {BaseComponent} from '../../base.component';
import {Input} from "@angular/core";
import {Component} from "@angular/core";
import {ViewChild} from "@angular/core";
import {ElementRef} from "@angular/core";
import {NgZone} from "@angular/core";
import {FormControl} from "@angular/forms";
import {MapsAPILoader} from '@agm/core';
import {SystemLanguagesResolver} from '../../../resolvers/system-languages/system-languages.resolver';
import {UserResolver} from '../../../resolvers/user/user.resolver';
import {TextInputComponent} from '../text-input/text-input.component';

@Component({
  selector: "city-autocomplete-input",
  template: `
  <text-input
    [apiErrors]="apiErrors"
    [control]="control"
    [hint]="hint"
    [label]="showLabel && ('input.city.autocomplete.label' | translate)"
    [placeholder]="'input.city.autocomplete.placeholder' | translate"
    #textInput
    apiAttribute="city"
    icon="pink map"
    type="text">
  </text-input>`
})
export class CityAutocompleteInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public cityControl: FormControl;
  @Input() public countryCodeControl: FormControl;
  @Input() public stateControl: FormControl;
  @Input() public latitudeControl: FormControl;
  @Input() public longitudeControl: FormControl;
  @Input() public hint: string;
  @Input() public showLabel: boolean = true;

  @ViewChild("textInput")
  public textInput: TextInputComponent;

  public cityControlInfoMap: any;

  public constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.cityControlInfoMap = {
      'locality': {
        control: this.cityControl,
        attribute: 'long_name'
      },
      'administrative_area_level_1': {
        control: this.stateControl,
        attribute: 'long_name'
      },
      'country': {
        control: this.countryCodeControl,
        attribute: 'short_name'
      }
    }

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.textInput.inputRef.nativeElement, {
        types: ['(cities)'],
        componentRestrictions: {country: "SE"}
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          this.clearControls();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            this.control.setValue('');
            return;
          }

          this.control.setValue(place.formatted_address);
          this.fillInCityInfo(place);
          this.fillInCoordinates(place);
        });
      });
    });
  }

  private clearControls() {
    // Clear city control values
    for (let mapping of this.cityControlInfoMap) {
      mapping.control.setValue('');
    }
    this.latitudeControl.setValue('');
    this.longitudeControl.setValue('');
  }

  private fillInCityInfo(place: any) {
    // Fill in city controls with google places
    for (let addressComponent of place.address_components) {
      let addressType = addressComponent.types[0];
      let mapping = this.cityControlInfoMap[addressType];
      if (mapping) {
        mapping.control.setValue(addressComponent[mapping.attribute]);
      }
    }
  }

  private fillInCoordinates(place: any) {
    // Fill in coordinate controls with coordinates
    this.latitudeControl.setValue(place.geometry.location.lat());
    this.longitudeControl.setValue(place.geometry.location.lng());
  }
}
