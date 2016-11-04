import {Injectable} from "@angular/core";
import {ApiCall} from "./api-call.service";
import {map} from "lodash";
import {Job} from "../models/job/job";
import {HourlyPay} from "../models/job/job";
import {Category} from "../models/job/job";

@Injectable()
export class JobProxy {

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
    return this.apiCall.post('jobs',  job);
  }
}
