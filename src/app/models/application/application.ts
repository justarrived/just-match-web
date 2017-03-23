import {Invoice} from '../invoice/invoice'
import {Job} from '../job/job';
import {User} from '../user/user';
import * as moment from 'moment';

export class Application {
  // API fields
  public accepted: boolean;
  public acceptedAt: string;
  public applyMessage: string;
  public id: number;
  public invoice: Invoice;
  public job: Job;
  public jobEnded: boolean;
  public languageId: string;
  public performed: boolean;
  public ratingScore: number;
  public translatedText: ApplicationTranslatedText;
  public user: User;
  public willPerform: boolean;
  public willPerformConfirmationBy: Date;

  // Client fields
  private readonly minutesPerHour: number = 60;
  public remainsConfirmationHours: number;
  public remainsConfirmationMinutes: number;

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
    this.jobEnded = jsonObject.job_ended;
    this.languageId = jsonObject.language_id;
    this.performed = jsonObject.performed;
    this.ratingScore = jsonObject.rating_score;
    this.translatedText = new ApplicationTranslatedText(jsonObject.translated_text);
    this.user = new User(jsonObject.user);
    this.willPerform = jsonObject.will_perform;
    this.willPerformConfirmationBy = new Date(jsonObject.will_perform_confirmation_by);

    if (this.willPerformConfirmationBy) {
      let differenceInMinutes = moment(this.willPerformConfirmationBy).diff(new Date(), 'minutes');
      this.remainsConfirmationHours = Math.floor(differenceInMinutes / this.minutesPerHour);
      this.remainsConfirmationMinutes = differenceInMinutes % this.minutesPerHour;
    }
  }
}

export class ApplicationTranslatedText {
  // API fields
  public applyMessage: string;
  public languageId: string;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.applyMessage = jsonObject.apply_message;
    this.languageId = jsonObject.language_id;
  }
}
