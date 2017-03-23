import {ApiCall} from '../api-call.service';
import {Application} from '../../models/application/application';
import {Category} from '../../models/category/category';
import {HourlyPay} from '../../models/hourly-pay/hourly-pay';
import {Injectable} from '@angular/core';
import {Job} from '../../models/job/job';
import {map} from 'lodash';

@Injectable()
export class JobProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  public getJobsWithTotal(additionOptions?: Object) {
    return this.apiCall.get('jobs',  additionOptions).then(response => {
      return {
        jobs: response.data.map(data => new Job(data)),
        total: response.total
      };
    });
  }

  public getJobs(additionOptions?: Object): Promise<Job[]> {
    return this.apiCall.get('jobs',  additionOptions)
      .then(response => response.data.map(data => new Job(data)));
  }

  public getHourlyPays(additionOptions?: Object) {
    return this.apiCall.get('hourly-pays', additionOptions).then(response => map(response.data, data => new HourlyPay(data)));
  }

  public getCategories(additionOptions?: Object) {
    return this.apiCall.get('categories', additionOptions).then(response => map(response.data, data => new Category(data)));
  }

  public saveJob(job: any): Promise<any> {
    return this.apiCall.post('jobs', job);
  }

  public getJob(jobId: number, additionOptions?: Object): Promise<Job> {
    return this.apiCall.get('jobs/' + jobId, additionOptions).then(response => {
      return new Job(response.data);
    });
  }

  public applyForJob(jobId) {
    return this.apiCall.post('jobs/' + jobId + '/users', {});
  }

  public acceptForJob(jobId, applicationId) {
    return this.apiCall.post('jobs/' + jobId + '/users/' + applicationId + '/acceptances ', {}).then(response => {
      return new Application(response.data);
    });
  }

  public confirmForJob(jobId, applicationId) {
    return this.apiCall.post('jobs/' + jobId + '/users/' + applicationId + '/confirmations ', {}).then(response => {
      return new Application(response.data);
    });
  }

  public createInvoice(jobId, applicationId) {
    return this.apiCall.post('jobs/' + jobId + '/users/' + applicationId + '/invoices ', {});
  }

  public getApplication(jobId, applicationId, additionOptions?: Object) {
    return this.apiCall.get('jobs/' + jobId + '/users/' + applicationId, additionOptions).then(response => {
      return new Application(response.data);
    });
  }

  public addRating(jobId, ratingData) {
    return this.apiCall.post('jobs/' + jobId + '/ratings', ratingData);
  }

  public getOwnedJobs(userId: string, additionOptions?: Object) {
    return this.apiCall.get('users/' + userId + '/owned-jobs',  additionOptions).then(response => map(response.data, data => new Job(data)));
  }

  public getApplications(jobId, additionOptions?: Object): Promise<Application[]> {
    return this.apiCall.get('jobs/' + jobId + '/users',  additionOptions).then(response => map(response.data, data => new Application(data)));
  }

}
