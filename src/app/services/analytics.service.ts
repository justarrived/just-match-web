import {Angulartics2} from 'angulartics2';
import {Injectable} from '@angular/core';

@Injectable()
export class AnalyticsService {

  public constructor(
    private angulartics2: Angulartics2
  ) {
  }

  public publishEvent(action: string, properties?: any, ) {
    this.angulartics2.eventTrack.next({
      action: action,
      properties: properties
    });
  }
}

export enum AnalyticsActions {
    ApplyForJobTry = "TryToApplyForJob",
    ApplyForJobSuccess = "ApplyForJobSuccess",
    ApplyForJobFail = "ApplyForJobFail",
}
