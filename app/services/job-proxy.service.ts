import {Injectable} from "@angular/core";
import {ApiCall} from "./api-call.service";
import {map} from "lodash";
import {Job, HourlyPay, Category} from "../models/job/job";
import {UserJob} from "../models/user/user-job";

@Injectable()
export class JobProxy {
  job: Job = null;

  constructor(private apiCall: ApiCall) { }

  getJobs(additionOptions?: Object) {
    return this.apiCall.get('jobs',  additionOptions).then(response => {
      return {
        data: map(response.data, data => new Job(data)),
        total: response.total
      };
    });
  }

  getHourlyPays(additionOptions?: Object) {
    return this.apiCall.get('hourly-pays', additionOptions).then(response => map(response.data, data => new HourlyPay(data)));
  }

  getCategories(additionOptions?: Object) {
    return this.apiCall.get('categories', additionOptions).then(response => map(response.data, data => new Category(data)));
  }

  saveJob(job: any): Promise<any> {
    return this.apiCall.post('jobs', job);
  }

  getJob(jobId: number, additionOptions?: Object): Promise<Job> {
    return this.apiCall.get('jobs/' + jobId, additionOptions).then(response => {
      return new Job(response.data);
    });
  }

  applyForJob(jobId) {
    return this.apiCall.post('jobs/' + jobId + '/users', {});
  }

  acceptForJob(jobId, userJobId) {
    return this.apiCall.post('jobs/' + jobId + '/users/' + userJobId + '/acceptances ', {}).then(response => {
      return new UserJob(response.data);
    });
  }

  confirmForJob(jobId, userJobId) {
    return this.apiCall.post('jobs/' + jobId + '/users/' + userJobId + '/confirmations ', {}).then(response => {
      return new UserJob(response.data);
    });
  }

  getUserJobs(jobId, additionOptions?: Object): Promise<UserJob[]> {
    return this.apiCall.get('jobs/' + jobId + '/users', additionOptions).then(response => {
      return map(response.data, data => new UserJob(data));
    });
  }

  getUserJob(jobId, userJobId, additionOptions?: Object) {
    return this.apiCall.get('jobs/' + jobId + '/users/' + userJobId, additionOptions).then(response => {
      return new UserJob(response.data);
    });
  }

}
