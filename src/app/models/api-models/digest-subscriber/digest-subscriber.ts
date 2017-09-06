import {JobDigest} from '../job-digest/job-digest';
import {JobDigestFactory} from '../job-digest/job-digest';
import {User} from '../user/user';
import {UserFactory} from '../user/user';
import {map} from 'lodash';

// API attribute interfaces
interface DigestSubscriberApiAttributes {
  id: string;
  user: User;
  digests: JobDigest[];
}

// Client interfaces
export interface DigestSubscriber extends DigestSubscriberApiAttributes {
}

// Factories
export class DigestSubscriberFactory {
  public static createDigestSubscriber(jsonObject?: any): DigestSubscriber {
    if (!jsonObject) {
      return;
    }

    return {
      digests: map(jsonObject.digests, jobDigest => JobDigestFactory.createJobDigest(jobDigest)),
      id: jsonObject.id,
      job: UserFactory.createUser(jsonObject.job),
    };
  }
}
