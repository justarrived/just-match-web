import {Invoice} from '../invoice/invoice'
import {InvoiceFactory} from '../invoice/invoice'
import {Job} from '../job/job';
import {JobFactory} from '../job/job';
import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';
import {User} from '../user/user';
import {UserFactory} from '../user/user';
import * as moment from 'moment';

// API attribute interfaces
interface ApplicationApiAttributes {
  accepted: boolean;
  acceptedAt: string;
  applyMessage: string;
  id: number;
  invoice: Invoice;
  job: Job;
  jobEnded: boolean;
  language: Language;
  languageId: string;
  performed: boolean;
  ratingScore: number;
  translatedText: ApplicationTranslatedText;
  user: User;
  willPerform: boolean;
  willPerformConfirmationBy: Date;
}

interface ApplicationTranslatedTextApiAttributes {
  applyMessage: string;
  languageId: string;
}

// Client interfaces
export interface Application extends ApplicationApiAttributes {
  remainsConfirmationHours: number;
  remainsConfirmationMinutes: number;
}

export interface ApplicationTranslatedText extends ApplicationTranslatedTextApiAttributes {
}

// Factories
export class ApplicationFactory {
  public static createApplication(jsonObject?: any): Application {
    if (!jsonObject) {
      return;
    }

    const minutesPerHour = 60;

    let willPerformConfirmationBy = new Date(jsonObject.will_perform_confirmation_by);
    let remainsConfirmationHours;
    let remainsConfirmationMinutes;
    if (willPerformConfirmationBy) {
      let differenceInMinutes = moment(willPerformConfirmationBy).diff(new Date(), 'minutes');
      remainsConfirmationHours = Math.floor(differenceInMinutes / minutesPerHour);
      remainsConfirmationMinutes = differenceInMinutes % minutesPerHour;
    }

    return {
      accepted: jsonObject.accepted,
      acceptedAt: jsonObject.accepted_at,
      applyMessage: jsonObject.apply_message,
      id: jsonObject.id,
      invoice: InvoiceFactory.createInvoice(jsonObject.invoice),
      job: JobFactory.createJob(jsonObject.job),
      jobEnded: jsonObject.job_ended,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      performed: jsonObject.performed,
      ratingScore: jsonObject.rating_score,
      translatedText: ApplicationTranslatedTextFactory.createApplicationTranslatedText(jsonObject.translated_text),
      user: UserFactory.createUser(jsonObject.user),
      willPerform: jsonObject.will_perform,
      willPerformConfirmationBy: willPerformConfirmationBy,
      remainsConfirmationHours: remainsConfirmationHours,
      remainsConfirmationMinutes: remainsConfirmationMinutes
    };
  }
}

class ApplicationTranslatedTextFactory {
  public static createApplicationTranslatedText(jsonObject?: any): ApplicationTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      applyMessage: jsonObject.apply_message,
      languageId: jsonObject.language_id
    };
  }
}
