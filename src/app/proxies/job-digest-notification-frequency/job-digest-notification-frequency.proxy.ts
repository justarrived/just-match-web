import {ApiCallService} from '../../services/api-call.service';
import {JobDigestNotificationFrequency} from '../../models/api-models/job-digest-notification-frequency/job-digest-notification-frequency';
import {JobDigestNotificationFrequencyFactory} from '../../models/api-models/job-digest-notification-frequency/job-digest-notification-frequency';
import {Injectable} from '@angular/core';

@Injectable()
export class JobDigestNotificationFrequencyProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getJobDigestNotificationFrequencies(searchParameters?: any): Promise<JobDigestNotificationFrequency[]> {
    return this.apiCallService.get('users/statuses', searchParameters)
    .then(response => response.data.map(jobDigestNotificationFrequency => JobDigestNotificationFrequencyFactory.createJobDigestNotificationFrequency(jobDigestNotificationFrequency)));
  }

  public getJobDigestNotificationFrequenciesWithMeta(searchParameters?: any): Promise<{jobDigestNotificationFrequencies: JobDigestNotificationFrequency[], meta: any}> {
    return this.apiCallService.get('users/statuses', searchParameters)
    .then(response => {
      return {
        jobDigestNotificationFrequencies: response.data.map(jobDigestNotificationFrequency => JobDigestNotificationFrequencyFactory.createJobDigestNotificationFrequency(jobDigestNotificationFrequency)),
        meta: response.meta
      }
    });
  }
}
