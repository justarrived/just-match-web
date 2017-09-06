import {Job} from '../job/job';
import {JobFactory} from '../job/job';

// API attribute interfaces
interface JobDigestApiAttributes {
  id: string;
  job: Job;
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
      id: jsonObject.id,
      job: JobFactory.createJob(jsonObject.job),
    };
  }
}
