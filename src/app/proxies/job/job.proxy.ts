import {ApiCall} from '../../services/api-call.service';
import {Job} from '../../models/api-models/job/job';
import {JobFactory} from '../../models/api-models/job/job';
import {Injectable} from '@angular/core';

// CREATE
interface CreateJobAttributes {
  category_id: string;
  description: string;
  hourly_pay_id: string;
  hours: number;
  job_date: Date;
  job_end_date: Date;
  language_id: string;
  name: string;
  short_description?: string;
  skill_ids: string[];
  upcoming?: boolean;
}

// UPDATE
interface UpdateJobAttributes {
  cancelled?: boolean;
  category_id?: string;
  description?: string;
  hourly_pay_id?: string;
  hours?: number;
  job_date?: Date;
  job_end_date?: Date;
  oswner_user_id?: string;
  name?: string;
  short_description?: string;
  upcoming?: boolean;
}

@Injectable()
export class JobProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  // GET
  public getJob(jobId: string, searchParameters?: any): Promise<Job> {
    return this.apiCall.get('jobs/' + jobId, searchParameters)
    .then(response => JobFactory.createJob(response.data));
  }

  public getJobs(searchParameters?: any): Promise<Job[]> {
    return this.apiCall.get('jobs', searchParameters)
    .then(response => response.data.map(job => JobFactory.createJob(job)));
  }

  public getJobsWithMeta(searchParameters?: any): Promise<{jobs: Job[], meta: {total: number}}> {
    return this.apiCall.get('jobs', searchParameters)
    .then(response => {
      return {
        jobs: response.data.map(job => JobFactory.createJob(job)),
        meta: response.meta
      }
    });
  }

  public getJobsMatchingUser(userId: string, searchParameters?: any): Promise<Job[]> {
    return this.apiCall.get('users/' + userId + '/matching-jobs', searchParameters)
    .then(response => response.data.map(job => JobFactory.createJob(job)));
  }

  public getJobsMatchingUserWithMeta(userId: string, searchParameters?: any): Promise<{jobs: Job[], meta: {total: number}}> {
    return this.apiCall.get('users/' + userId + '/matching-jobs', searchParameters)
    .then(response => {
      return {
        jobs: response.data.map(job => JobFactory.createJob(job)),
        meta: response.meta
      }
    });
  }

  public getJobsOwnedByUser(userId: string, searchParameters?: any): Promise<Job[]> {
    return this.apiCall.get('users/' + userId + '/owned-jobs', searchParameters)
    .then(response => response.data.map(job => JobFactory.createJob(job)));
  }

  public getJobsOwnedByUserWithMeta(userId: string, searchParameters?: any): Promise<{jobs: Job[], meta: {total: number}}> {
    return this.apiCall.get('users/' + userId + '/owned-jobs', searchParameters)
    .then(response => {
      return {
        jobs: response.data.map(job => JobFactory.createJob(job)),
        meta: response.meta
      }
    });
  }

  // CREATE
  public createJob(jobAttributes: CreateJobAttributes): Promise<Job> {
    return this.apiCall.post('jobs', jobAttributes)
    .then(response => JobFactory.createJob(response.data));
  }

  // UPDATE
  public updateJob(jobId: string, jobAttributes: UpdateJobAttributes): Promise<Job> {
    return this.apiCall.patch('jobs/' + jobId, jobAttributes)
    .then(response => JobFactory.createJob(response.data));
  }
}
