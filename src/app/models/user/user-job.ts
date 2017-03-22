import {Job} from '../job/job';
import {User} from './user';
import * as moment from 'moment';

export class UserJob {
  private readonly minutesPerHour: number = 60;

  public accepted: boolean;
  public acceptedAt: string;
  public applyMessage: string;
  public id: number;
  public invoice: Invoice;
  public job_ended: boolean;
  public job: Job;
  public performed: boolean;
  public ratingScore: number;
  public remainsConfirmationHours: number;
  public remainsConfirmationMinutes: number;
  public translated: UserJob;
  public user: User;
  public willPerform: boolean;
  public willPerformConfirmationBy: string;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.accepted = jsonObject.accepted;
    this.acceptedAt = jsonObject.accepted_at;
    this.applyMessage = jsonObject.apply_message;
    this.id = jsonObject.id;
    this.invoice = new Invoice(jsonObject.invoice);
    this.job = new Job(jsonObject.job);
    this.job_ended = jsonObject.job_ended;
    this.performed = jsonObject.performed;
    this.ratingScore = jsonObject.rating_score;
    this.user = new User(jsonObject.user);
    this.willPerform = jsonObject.will_perform;
    this.willPerformConfirmationBy = jsonObject.will_perform_confirmation_by;

    if (jsonObject.translated_text) {
      this.translated = new UserJob(jsonObject.translated_text);
    }

    if (this.willPerformConfirmationBy) {
      let differenceInMinutes = moment(new Date(this.willPerformConfirmationBy)).diff(new Date(), 'minutes');
      this.remainsConfirmationHours = Math.floor(differenceInMinutes / this.minutesPerHour);
      this.remainsConfirmationMinutes = differenceInMinutes % this.minutesPerHour;
    }
  }
}

export class Invoice {
  id: number;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
  }
}
