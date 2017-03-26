import {ApiCall} from '../api-call.service';
import {Application} from '../../models/api-models/application/application'
import {ApplicationFactory} from '../../models/api-models/application/application'
import {Category} from '../../models/api-models/category/category';
import {CategoryFactory} from '../../models/api-models/category/category';
import {HourlyPay} from '../../models/api-models/hourly-pay/hourly-pay';
import {HourlyPayFactory} from '../../models/api-models/hourly-pay/hourly-pay';
import {Injectable} from '@angular/core';
import {Job} from '../../models/api-models/job/job';
import {JobFactory} from '../../models/api-models/job/job';
import {map} from 'lodash';

@Injectable()
export class JobProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  public getJobsWithTotal(additionOptions?: any) {
    return this.apiCall.get('jobs',  additionOptions)
    .then(response => {
      return {
        jobs: response.data.map(data => JobFactory.createJob(data)),
        total: response.meta.total
      };
    });
  }

  public getJobs(additionOptions?: any): Promise<Job[]> {
    return this.apiCall.get('jobs',  additionOptions)
      .then(response => response.data.map(data => JobFactory.createJob(data)));
  }

  public getHourlyPays(additionOptions?: any) {
    return this.apiCall.get('hourly-pays', additionOptions)
    .then(response => map(response.data, data => HourlyPayFactory.createHourlyPay(data)));
  }

  public saveJob(job: any): Promise<any> {
    return this.apiCall.post('jobs', job);
  }

  public getJob(jobId: number, additionOptions?: any): Promise<Job> {
    return this.apiCall.get('jobs/' + jobId, additionOptions)
    .then(response => {
      return JobFactory.createJob(response.data);
    });
  }

  public createInvoice(jobId, applicationId) {
    return this.apiCall.post('jobs/' + jobId + '/users/' + applicationId + '/invoices ', {});
  }

  public addRating(jobId, ratingData) {
    return this.apiCall.post('jobs/' + jobId + '/ratings', ratingData);
  }

  public getOwnedJobs(userId: string, additionOptions?: any) {
    return this.apiCall.get('users/' + userId + '/owned-jobs',  additionOptions)
    .then(response => map(response.data, data => JobFactory.createJob(data)));
  }
}
