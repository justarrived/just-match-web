import {ApiCall} from '../../services/api-call.service';
import {Injectable} from '@angular/core';

// CREATE
interface CreateUserSessionAttributes {
  email_or_phone?: string;
  password?: string;
  one_time_token?: string;
}

interface CreateUserSessionMagicLinkAttributes {
  email_or_phone: string;
}

@Injectable()
export class UserSessionProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  // CREATE
  public createUserSession(sessionAttributes: CreateUserSessionAttributes): Promise<any> {
    return this.apiCall.post('users/sessions', sessionAttributes)
    .then(response => response.data);
  }

  public createUserSessionMagicLink(sessionAttributes: CreateUserSessionMagicLinkAttributes): Promise<any> {
    return this.apiCall.post('users/sessions', sessionAttributes);
  }

  // REMOVE
  public removeUserSession(authToken: string): Promise<any> {
    return this.apiCall.delete('users/sessions/' + authToken);
  }
}
