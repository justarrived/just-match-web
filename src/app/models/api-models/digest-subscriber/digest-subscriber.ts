import {JobDigest} from '../job-digest/job-digest';
import {JobDigestFactory} from '../job-digest/job-digest';
import {User} from '../user/user';
import {UserFactory} from '../user/user';
import {map} from 'lodash';

// API attribute interfaces
interface DigestSubscriberApiAttributes {
  createdAt: Date;
  deletedAt: Date;
  email: string;
  id: string;
  jobDigests: JobDigest[];
  updatedAt: Date;
  user: User;
  uuid: string;
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
      createdAt: new Date(jsonObject.created_at),
      deletedAt: new Date(jsonObject.deleted_at),
      email: jsonObject.email,
      id: jsonObject.id,
      job: UserFactory.createUser(jsonObject.job),
      jobDigests: map(jsonObject.job_digests, jobDigest => JobDigestFactory.createJobDigest(jobDigest)),
      updatedAt: new Date(jsonObject.updated_at),
      uuid: jsonObject.uuid,
    };
  }
}
