import * as moment from 'moment';
import {User} from "../user";

export class UserJob {
  private MINUTES_PER_HOUR: number = 60;
  id: number;
  accepted: boolean;
  acceptedAt: string;
  applyMessage: string;
  performed: boolean;
  willPerform: boolean;
  willPerformConfirmationBy: string;
  user: User;
  remainsConfirmationHours: number;
  remainsConfirmationMinutes: number;

  constructor(jsonObject: any) {
    this.id = jsonObject.id;
    this.accepted = jsonObject.accepted;
    this.acceptedAt = jsonObject.accepted_at;
    this.applyMessage = jsonObject.apply_message;
    this.performed = jsonObject.performed;
    this.willPerform = jsonObject.will_perform;
    this.willPerformConfirmationBy = jsonObject.will_perform_confirmation_by;
    this.user = new User(jsonObject.user);
    if (this.willPerformConfirmationBy) {
      let differenceInMinutes = moment(new Date(this.willPerformConfirmationBy)).diff(new Date(), 'minutes');
      this.remainsConfirmationHours = Math.floor(differenceInMinutes / this.MINUTES_PER_HOUR);
      this.remainsConfirmationMinutes = differenceInMinutes % this.MINUTES_PER_HOUR;
    }
  }

}
