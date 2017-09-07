import {ApiCallService} from '../../services/api-call.service';
import {Injectable} from '@angular/core';
import {Occupation} from '../../models/api-models/occupation/occupation';
import {OccupationFactory} from '../../models/api-models/occupation/occupation';

@Injectable()
export class OccupationProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getOccupation(occupationId: string, searchParameters?: any): Promise<Occupation> {
    return this.apiCallService.get('occupations/' + occupationId, searchParameters)
    .then(response => OccupationFactory.createOccupation(response.data));
  }

  public getOccupations(searchParameters?: any): Promise<Occupation[]> {
    return this.apiCallService.get('occupations', searchParameters)
    .then(response => response.data.map(occupation => OccupationFactory.createOccupation(occupation)));
  }

  public getOccupationsWithMeta(searchParameters?: any): Promise<{occupations: Occupation[], meta: any}> {
    return this.apiCallService.get('occupations', searchParameters)
    .then(response => {
      return {
        occupations: response.data.map(occupation => OccupationFactory.createOccupation(occupation)),
        meta: response.meta
      }
    });
  }
}
