import {ApiCallService} from '../../services/api-call.service';
import {EmailSuggestion} from '../../models/api-models/email-suggestion/email-suggestion';
import {EmailSuggestionFactory} from '../../models/api-models/email-suggestion/email-suggestion';
import {Injectable} from '@angular/core';

// CREATE
interface CreateEmailSuggestionAttributes {
  email: string;
}

@Injectable()
export class EmailSuggestionProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }


  // CREATE
  public createEmailSuggestion(emailSuggestionAttributes: CreateEmailSuggestionAttributes, searchParameters?: any): Promise<EmailSuggestion> {
    return this.apiCallService.post('email-suggestion', emailSuggestionAttributes, searchParameters)
    .then(response => EmailSuggestionFactory.createEmailSuggestion(response.data));
  }
}
