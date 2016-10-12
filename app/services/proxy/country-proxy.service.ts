import {Injectable} from "@angular/core";
import {ApiCall} from "../api-call.service";
import {map} from "lodash";
import {Country} from "../../models/country";

@Injectable()
export class CountryProxy {

  constructor(private apiCall: ApiCall) { }

  getCountries(name: string = ''): Promise<Array<Country>> {
    return this.apiCall.get('countries', {'filter[name]': name})
      .then(response => map(response.data, data => new Country(data)));
  }

}
