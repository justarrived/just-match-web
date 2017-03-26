import {ApiCall} from '../../services/api-call.service';
import {Gender} from '../../models/api-models/gender/gender';
import {GenderFactory} from '../../models/api-models/gender/gender';
import {Injectable} from '@angular/core';

@Injectable()
export class GenderProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  // GET
  public getGenders(searchParameters?: any): Promise<Gender[]> {
    return this.apiCall.get('users/genders', searchParameters)
    .then(response => response.data.map(gender => GenderFactory.createGender(gender)));
  }

  public getGendersWithMeta(searchParameters?: any): Promise<{genders: Gender[], meta: {total: number}}> {
    return this.apiCall.get('users/genders', searchParameters)
    .then(response => {
      return {
        genders: response.data.map(gender => GenderFactory.createGender(gender)),
        meta: response.meta
      }
    });
  }
}
