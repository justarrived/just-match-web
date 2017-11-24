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
    ApplyForJobFail = "ApplyForJobFail",
    ApplyForJobSuccess = "ApplyForJobSuccess",
    ApplyForJobTry = "ApplyForJobTry",
    CreateSubscriptionFail = "CreateSubscriptionFail",
    CreateSubscriptionSuccess = "CreateSubscriptionSuccess",
    CreateSubscriptionTry = "CreateSubscriptionTry",
    LoginFail = "LoginFail",
    LoginSuccess = "LoginSuccess",
    LoginTry = "LoginTry",
    RegisterFail = "RegisterFail",
    RegisterSuccess = "RegisterSuccess",
    RegisterTry = "RegisterTry",
    SignForJobFail = "SignForJobFail",
    SignForJobSuccess = "SignForJobSuccess",
    SignForJobTry = "SignForJobTry",
    UpdateProfileFail = "UpdateProfileFail",
    UpdateProfileSuccess = "UpdateProfileSuccess",
    UpdateProfileTry = "UpdateProfileTry",
    UploadResumeFail = "UploadResumeFail",
    UploadResumeSuccess = "UploadResumeSuccess",
    UploadResumeTry = "UploadResumeTry",
}
