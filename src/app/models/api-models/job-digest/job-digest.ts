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
  address: Address;
  createdAt: Date;
  deletedAt: Date;
  id: string;
  locale: string;
  maxDistance: number;
  notificationFrequency: number;
  occupations: Occupation[];
  subscriber: DigestSubscriber;
  updatedAt: Date;
  user: User;
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
      address: AddressFactory.createAddress(jsonObject.address),
      createdAt: new Date(jsonObject.created_at),
      deletedAt: new Date(jsonObject.deleted_at),
      id: jsonObject.id,
      locale: jsonObject.locale,
      maxDistance: jsonObject.max_distance,
      notificationFrequency: jsonObject.notification_frequency,
      occupations: map(jsonObject.occupations, occupation => OccupationFactory.createOccupation(occupation)),
      subscriber: DigestSubscriberFactory.createDigestSubscriber(jsonObject.subscriber),
      updatedAt: new Date(jsonObject.updated_at),
      user: UserFactory.createUser(jsonObject.user),
    };
  }
}
