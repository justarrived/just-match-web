import {Injectable} from "@angular/core";
import {ApiCall} from "../api-call.service";
import {map} from "lodash";
import {Country} from "../../models/country";
import {Observable} from "rxjs";

@Injectable()
export class CountryProxy {

  constructor(private apiCall: ApiCall) { }

  getCountries(name: string): Observable<Array<Country>> {
    return Observable.fromPromise(this.apiCall.get('countries', {filter: {name: name}}).then(response => map(response.data, data => new Country(data))));
  }

}
