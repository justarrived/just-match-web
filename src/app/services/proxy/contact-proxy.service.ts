import {Injectable} from '@angular/core';
import {ApiCall} from '../api-call.service';

@Injectable()
export class ContactProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  public saveContactNotification(data: any): Promise<any> {
    return this.apiCall.post('contacts', data);
  }
}
