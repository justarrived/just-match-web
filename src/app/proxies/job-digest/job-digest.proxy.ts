import {ApiCallService} from '../../services/api-call.service';
import {JobDigest} from '../../models/api-models/job-digest/job-digest';
import {JobDigestFactory} from '../../models/api-models/job-digest/job-digest';
import {Injectable} from '@angular/core';

// CREATE
interface CreateJobDigestAttributes {
}

// UPDATE
interface UpdateJobDigestAttributes {
}

@Injectable()
export class JobDigestProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getJobDigest(uuidOrUserId: string, searchParameters?: any): Promise<JobDigest[]> {
    return this.apiCallService.get('jobs/' + uuidOrUserId + '/digests', searchParameters)
    .then(response => response.data.map(jobDigest => JobDigestFactory.createJobDigest(jobDigest)));
  }

  // CREATE
  public createJobDigest(jobDigestAttributes: CreateJobDigestAttributes, searchParameters?: any): Promise<JobDigest> {
    return this.apiCallService.post('jobs/digests', jobDigestAttributes, searchParameters)
    .then(response => JobDigestFactory.createJobDigest(response.data));
  }

  // UPDATE
  public updateJobDigest(userId: string, jobDigestAttributes: UpdateJobDigestAttributes, searchParameters?: any): Promise<JobDigest> {
    return this.apiCallService.patch('/jobs/subscribers/' + uuidOrUserId + '/digests/' + jobDigestId, jobDigestAttributes, searchParameters)
    .then(response => JobDigestFactory.createJobDigest(response.data));
  }

  // REMOVE
  public removeJobDigest(uuidOrUserId: string, jobDigestId: string): Promise<any> {
    return this.apiCallService.delete('/jobs/subscribers/' + uuidOrUserId + '/digests/' + jobDigestId);
  }
}
