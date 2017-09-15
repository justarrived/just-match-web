import {Address} from '../address/address';
import {AddressFactory} from '../address/address';
import {DigestSubscriber} from '../digest-subscriber/digest-subscriber';
import {DigestSubscriberFactory} from '../digest-subscriber/digest-subscriber';
import {map} from 'lodash';
import {Occupation} from '../occupation/occupation';
import {OccupationFactory} from '../occupation/occupation';
import {User} from '../user/user';
import {UserFactory} from '../user/user';

// API attribute interfaces
interface JobDigestApiAttributes {
  addresses: Address[];
  id: string;
  maxDistance: number;
  notificationFrequency: string;
  occupations: Occupation[];
  subscriber: DigestSubscriber;
}

// Client interfaces
export interface JobDigest extends JobDigestApiAttributes {
}

// Factories
export class JobDigestFactory {
  public static createJobDigest(jsonObject?: any): JobDigest {
    if (!jsonObject) {
      return;
    }

    return {
      addresses: map(jsonObject.addresses, address => AddressFactory.createAddress(address)),
      id: jsonObject.id,
      maxDistance: jsonObject.max_distance,
      notificationFrequency: jsonObject.notification_frequency,
      occupations: map(jsonObject.occupations, occupation => OccupationFactory.createOccupation(occupation)),
      subscriber: DigestSubscriberFactory.createDigestSubscriber(jsonObject.subscriber),
    };
  }
}
