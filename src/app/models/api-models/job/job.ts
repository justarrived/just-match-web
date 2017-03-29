import {Application} from '../application/application';
import {ApplicationFactory} from '../application/application';
import {Category} from '../category/category';
import {CategoryFactory} from '../category/category';
import {Comment} from '../comment/comment';
import {CommentFactory} from '../comment/comment';
import {Company} from '../company/company';
import {CompanyFactory} from '../company/company';
import {HourlyPay} from '../hourly-pay/hourly-pay';
import {HourlyPayFactory} from '../hourly-pay/hourly-pay';
import {JobLanguage} from '../job-language/job-language';
import {JobLanguageFactory} from '../job-language/job-language';
import {JobSkill} from '../job-skill/job-skill';
import {JobSkillFactory} from '../job-skill/job-skill';
import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';
import {map} from 'lodash';
import {User} from '../user/user';
import {UserFactory} from '../user/user';

// API attribute interfaces
interface JobApiAttributes {
  applications: Application[];
  category: Category;
  city: string;
  company: Company;
  comments: Comment[];
  createdAt: Date;
  currency: string;
  description: string;
  descriptionHtml: string;
  directRecruitmentJob: boolean;
  featured: boolean;
  filled: boolean;
  fullStreetAddress: string;
  grossAmount: number;
  grossAmountDelimited: string;
  grossAmountWithCurrency: string;
  hourlyPay: HourlyPay;
  hours: number;
  id: string;
  invoiceAmount: number;
  jobDate: Date;
  jobEndDate: Date;
  jobLanguages: JobLanguage[];
  jobSkills: JobSkill[];
  language: Language;
  languageId: string;
  name: string;
  netAmount: number;
  netAmountDelimited: string;
  netAmountWithCurrency: string;
  owner: User;
  shortDescription: string;
  staffingJob: boolean;
  street: string;
  translatedText: JobTranslatedText;
  upcoming: boolean;
  updatedAt: Date;
  verified: boolean;
  zip: string;
  zipLatitude: number;
  zipLongitude: number;
}

interface JobTranslatedTextApiAttributes {
  description: string;
  descriptionHtml: string;
  languageId: string;
  name: string;
  shortDescription: string;
}

// Client interfaces
export interface Job extends JobApiAttributes {
}

export interface JobTranslatedText extends JobTranslatedTextApiAttributes {
}

// Factories
export class JobFactory {
  public static createJob(jsonObject?: any): Job {
    if (!jsonObject) {
      return;
    }

    return {
      applications: map(jsonObject.job_users, application => ApplicationFactory.createApplication(application)),
      category: CategoryFactory.createCategory(jsonObject.category),
      city: jsonObject.city,
      comments: map(jsonObject.comments, comment => CommentFactory.createComment(comment)),
      company: CompanyFactory.createCompany(jsonObject.company),
      createdAt: new Date(jsonObject.created_at),
      currency: jsonObject.currency,
      description: jsonObject.description,
      descriptionHtml: jsonObject.description_html,
      directRecruitmentJob: jsonObject.direct_recruitment_job,
      featured: jsonObject.featured,
      filled: jsonObject.filled,
      fullStreetAddress: jsonObject.full_street_address,
      grossAmount: jsonObject.gross_amount,
      grossAmountDelimited: jsonObject.gross_amount_delimited,
      grossAmountWithCurrency: jsonObject.gross_amount_with_currency,
      hourlyPay: HourlyPayFactory.createHourlyPay(jsonObject.hourly_pay),
      hours: jsonObject.hours,
      id: jsonObject.id,
      invoiceAmount: jsonObject.invoice_amount,
      jobDate: new Date(jsonObject.job_date),
      jobEndDate: new Date(jsonObject.job_end_date),
      jobLanguages: map(jsonObject.job_languages, jobLanguage => JobLanguageFactory.createJobLanguage(jobLanguage)),
      jobSkills:  map(jsonObject.job_skills, jobSkill => JobSkillFactory.createJobSkill(jobSkill)),
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      name: jsonObject.name,
      netAmount: jsonObject.net_amount,
      netAmountDelimited: jsonObject.net_amount_delimited,
      netAmountWithCurrency: jsonObject.net_amount_with_currency,
      owner: UserFactory.createUser(jsonObject.owner),
      shortDescription: jsonObject.short_description,
      staffingJob: jsonObject.staffingJob,
      street: jsonObject.street,
      translatedText: JobTranslatedTextFactory.createJobTranslatedText(jsonObject.translated_text),
      upcoming: jsonObject.upcoming,
      updatedAt: new Date(jsonObject.updated_at),
      verified: jsonObject.verified,
      zip: jsonObject.zip,
      zipLatitude: jsonObject.zip_latitude,
      zipLongitude: jsonObject.zip_longitude,
    };
  }
}

class JobTranslatedTextFactory {
  public static createJobTranslatedText(jsonObject?: any): JobTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      description: jsonObject.description,
      descriptionHtml: jsonObject.description_html,
      languageId: jsonObject.language_id,
      name: jsonObject.name,
      shortDescription: jsonObject.short_description,
    };
  }
}
