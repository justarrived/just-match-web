import {JobDigest} from '../job-digest/job-digest';
import {JobDigestFactory} from '../job-digest/job-digest';
import {map} from 'lodash';

// API attribute interfaces
interface DigestSubscriberApiAttributes {
  email: string;
  id: string;
  jobDigests: JobDigest[];
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
      email: jsonObject.email,
      id: jsonObject.id,
      jobDigests: map(jsonObject.job_digests, jobDigest => JobDigestFactory.createJobDigest(jobDigest)),
      uuid: jsonObject.uuid,
    };
  }
}
