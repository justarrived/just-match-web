import {ApiCall} from '../../services/api-call.service';
import {HourlyPay} from '../../models/api-models/hourly-pay/hourly-pay';
import {HourlyPayFactory} from '../../models/api-models/hourly-pay/hourly-pay';
import {Injectable} from '@angular/core';

// Get
interface CalculateHourlyPayBody {
  gross_salary: number;
}

@Injectable()
export class HourlyPayProxy {

  constructor(
    private apiCall: ApiCall
  ) {
  }

  // GET
  public getHourlyPay(hourlyPayId: string, searchParameters?: any): Promise<HourlyPay> {
    return this.apiCall.get('hourly-pays/' + hourlyPayId, searchParameters)
    .then(response => HourlyPayFactory.createHourlyPay(response.data));
  }

  public getHourlyPays(searchParameters?: any): Promise<HourlyPay[]> {
    return this.apiCall.get('hourly-pays', searchParameters)
    .then(response => response.data.map(hourlyPay => HourlyPayFactory.createHourlyPay(hourlyPay)));
  }

  public getHourlyPaysWithMeta(searchParameters?: any): Promise<{hourlyPays: HourlyPay[], meta: {total: number}}> {
    return this.apiCall.get('hourly-pays', searchParameters)
    .then(response => {
      return {
        hourlyPays: response.data.map(hourlyPay => HourlyPayFactory.createHourlyPay(hourlyPay)),
        meta: response.meta
      }
    });
  }

  public calculateHourlyPayAttributes(hourlyPayBody: CalculateHourlyPayBody, searchParameters?: any): Promise<HourlyPay> {
    return this.apiCall.get('hourly-pays/calculate', searchParameters, hourlyPayBody)
    .then(response => HourlyPayFactory.createHourlyPay(response.data));
  }
}
