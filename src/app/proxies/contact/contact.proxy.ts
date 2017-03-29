import {ApiCallService} from '../../services/api-call.service';
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
    private apiCallService: ApiCallService
  ) {
  }

  // CREATE
  public createContactNotification(contactNotificationAttributes: CreateContactNotificationAttributes): Promise<any> {
    return this.apiCallService.post('contacts', contactNotificationAttributes);
  }
}
