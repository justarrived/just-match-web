import {ApiCallService} from '../../services/api-call.service';
import {DigestSubscriber} from '../../models/api-models/digest-subscriber/digest-subscriber';
import {DigestSubscriberFactory} from '../../models/api-models/digest-subscriber/digest-subscriber';
import {Injectable} from '@angular/core';

// CREATE
interface CreateDigestSubscriberAttributes {
  user_id?: string;
  email?: string;
}

@Injectable()
export class DigestSubscriberProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getDigestSubscriber(uuidOrUserId: string, searchParameters?: any): Promise<DigestSubscriber[]> {
    return this.apiCallService.get('digests/subscribers/' + uuidOrUserId, searchParameters)
    .then(response => response.data.map(digestSubscriber => DigestSubscriberFactory.createDigestSubscriber(digestSubscriber)));
  }

  // CREATE
  public createDigestSubscriber(digestSubscriberAttributes: CreateDigestSubscriberAttributes, searchParameters?: any): Promise<DigestSubscriber> {
    return this.apiCallService.post('digests/subscribers', digestSubscriberAttributes, searchParameters)
    .then(response => DigestSubscriberFactory.createDigestSubscriber(response.data));
  }

  // REMOVE
  public removeDigestSubscriber(uuidOrUserId: string): Promise<any> {
    return this.apiCallService.delete('digests/subscribers/' + uuidOrUserId);
  }
}
