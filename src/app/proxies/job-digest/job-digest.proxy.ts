import {ApiCallService} from '../../services/api-call.service';
import {JobDigest} from '../../models/api-models/job-digest/job-digest';
import {JobDigestFactory} from '../../models/api-models/job-digest/job-digest';
import {Injectable} from '@angular/core';

interface AddressAttributes {
  city?: string;
  street1?: string;
  street2?: string;
  postal_code?: string;
  municipality?: string;
  state?: string;
  country_code?: string;
  latitude?: number;
  longitude?: number;
}

// CREATE
interface CreateJobDigestAttributes {
  addresses: AddressAttributes[];
  notification_frequency: number;
  digest_subscriber_uuid?: string;
  occupation_ids?: string[];
  user_id?: string;
  email?: string;
}

// UPDATE
interface UpdateJobDigestAttributes {
  addresses: AddressAttributes[];
  notification_frequency: number;
  digest_subscriber_uuid?: string;
  occupation_ids?: string[];
}

@Injectable()
export class JobDigestProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getJobDigests(uuidOrUserId: string, searchParameters?: any): Promise<JobDigest[]> {
    return this.apiCallService.get('jobs/subscribers/' + uuidOrUserId + '/digests', searchParameters)
    .then(response => response.data.map(jobDigest => JobDigestFactory.createJobDigest(jobDigest)));
  }

  public getJobDigestsWithMeta(uuidOrUserId: string, searchParameters?: any): Promise<{jobDigests: JobDigest[], meta: any}> {
    return this.apiCallService.get('jobs/subscribers/' + uuidOrUserId + '/digests', searchParameters)
    .then(response => {
      return {
        jobDigests: response.data.map(jobDigest => JobDigestFactory.createJobDigest(jobDigest)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createJobDigest(jobDigestAttributes: CreateJobDigestAttributes, searchParameters?: any): Promise<JobDigest> {
    return this.apiCallService.post('jobs/digests', jobDigestAttributes, searchParameters)
    .then(response => JobDigestFactory.createJobDigest(response.data));
  }

  // UPDATE
  public updateJobDigest(uuidOrUserId: string, jobDigestId: string, jobDigestAttributes: UpdateJobDigestAttributes, searchParameters?: any): Promise<JobDigest> {
    return this.apiCallService.patch('/jobs/subscribers/' + uuidOrUserId + '/digests/' + jobDigestId, jobDigestAttributes, searchParameters)
    .then(response => JobDigestFactory.createJobDigest(response.data));
  }

  // REMOVE
  public removeJobDigest(uuidOrUserId: string, jobDigestId: string): Promise<any> {
    return this.apiCallService.delete('/jobs/subscribers/' + uuidOrUserId + '/digests/' + jobDigestId);
  }
}
