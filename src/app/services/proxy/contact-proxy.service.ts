import {Injectable} from '@angular/core';
import {ApiCall} from '../api-call.service';
import {ContactNotification} from '../../models/contact-notification';

@Injectable()
export class ContactProxy {

  constructor(private apiCall: ApiCall) { }

  saveContactNotification(contactNotification: ContactNotification): Promise<any> {
    return this.apiCall.post('contacts', contactNotification.toJsonObject());
  }
}
