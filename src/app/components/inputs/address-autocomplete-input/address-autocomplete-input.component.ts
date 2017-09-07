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
  selector: "address-autocomplete-input",
  template: `
  <text-input
    [apiErrors]="apiErrors"
    [control]="control"
    [hint]="hint"
    [label]="'input.address.autocomplete.label' | translate"
    [placeholder]="'input.address.autocomplete.placeholder' | translate"
    #textInput
    apiAttribute="address"
    icon="pink map pin"
    type="text">
  </text-input>`
})
export class AddressAutocompleteInputComponent extends BaseComponent {
  @Input() public apiErrors: ApiErrors;
  @Input() public control: FormControl;
  @Input() public cityControl: FormControl;
  @Input() public countryCodeControl: FormControl;
  @Input() public postalCodeControl: FormControl;
  @Input() public stateControl: FormControl;
  @Input() public streetControl: FormControl;
  @Input() public streetNumberControl: FormControl;
  @Input() public latitudeControl: FormControl;
  @Input() public longitudeControl: FormControl;
  @Input() public hint: string;

  @ViewChild("textInput")
  public textInput: TextInputComponent;

  public addressControlMap: any;

  public constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    protected systemLanguagesResolver: SystemLanguagesResolver,
    protected userResolver: UserResolver,
  ) {
    super(systemLanguagesResolver, userResolver);
  }

  public onInit() {
    this.addressControlMap = {
      'street_number': {
        control: this.streetNumberControl,
        attribute: 'long_name'
      },
      'route': {
        control: this.streetControl,
        attribute: 'long_name'
      },
      'postal_town': {
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
      },
      'postal_code': {
        control: this.postalCodeControl,
        attribute: 'long_name'
      }
    }

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.textInput.inputRef.nativeElement, {
        types: ['address'],
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

          this.fillInAddress(place);
          this.fillInCoordinates(place);
        });
      });
    });
  }

  private clearControls() {
    // Clear address control values
    for (let mapping of this.addressControlMap) {
      mapping.control.setValue('');
    }
    this.latitudeControl.setValue('');
    this.longitudeControl.setValue('');
  }

  private fillInAddress(place: any) {
    // Fill in address controls with google address
    for (let addressComponent of place.address_components) {
      let addressType = addressComponent.types[0];
      let mapping = this.addressControlMap[addressType];
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
