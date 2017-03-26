import {ApiCall} from '../../services/api-call.service';
import {Injectable} from '@angular/core';

// CREATE
interface CreateContactNotificationAttributes {
  body: string;
  email: string;
  name: string;
}

@Injectable()
export class ContactProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  // CREATE
  public saveContactNotification(contactNotificationAttributes: CreateContactNotificationAttributes): Promise<any> {
    return this.apiCall.post('contacts', contactNotificationAttributes);
  }
}
