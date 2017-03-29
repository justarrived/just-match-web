import {ApiCallService} from '../../services/api-call.service';
import {Injectable} from '@angular/core';

// CREATE
interface SendUserPasswordResetLinkAttributes {
  email_or_phone: string;
}

// UPDATE
interface UpdateUserPasswordAttributes {
  old_password?: string;
  one_time_token?: string;
  password: string;
}

@Injectable()
export class UserPasswordProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // CREATE
  public sendUserPasswordResetLink(sendUserPasswordResetLinkAttributes: SendUserPasswordResetLinkAttributes): Promise<any> {
    return this.apiCallService.post('users/reset-password ', sendUserPasswordResetLinkAttributes);
  }

  // UPDATE
  public updateUserPassword(updateUserPasswordAttributes: UpdateUserPasswordAttributes): Promise<any> {
    return this.apiCallService.post('users/change-password ', updateUserPasswordAttributes);
  }
}
