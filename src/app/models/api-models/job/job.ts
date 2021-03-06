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
  applicantDescription: string;
  applicantDescriptionHtml: string;
  applications: Application[];
  category: Category;
  city: string;
  comments: Comment[];
  company: Company;
  createdAt: Date;
  currency: string;
  description: string;
  descriptionHtml: string;
  directRecruitmentJob: boolean;
  featured: boolean;
  filled: boolean;
  fullStreetAddress: string;
  fullTime: boolean;
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
  lastApplicationAt: Date;
  name: string;
  netAmount: number;
  netAmountDelimited: string;
  netAmountWithCurrency: string;
  openForApplications: boolean;
  owner: User;
  requirementsDescription: string;
  requirementsDescriptionHtml: string;
  responsibleRecruiter: User;
  shortDescription: string;
  staffingJob: boolean;
  street: string;
  tasksDescription: string;
  tasksDescriptionHtml: string;
  translatedText: JobTranslatedText;
  updatedAt: Date;
  zip: string;
  zipLatitude: number;
  zipLongitude: number;
  schemaOrg: JobSchemaOrg;
}

interface JobTranslatedTextApiAttributes {
  applicantDescription: string;
  applicantDescriptionHtml: string;
  description: string;
  descriptionHtml: string;
  languageId: string;
  name: string;
  requirementsDescription: string;
  requirementsDescriptionHtml: string;
  shortDescription: string;
  tasksDescription: string;
  tasksDescriptionHtml: string;
}

interface JobSchemaOrgApiAttributes {
  jobPosition: any;
}

// Client interfaces
export interface Job extends JobApiAttributes {
}

export interface JobTranslatedText extends JobTranslatedTextApiAttributes {
}

export interface JobSchemaOrg extends JobSchemaOrgApiAttributes {
}

// Factories
export class JobFactory {
  public static createJob(jsonObject?: any): Job {
    if (!jsonObject) {
      return;
    }

    return {
      applicantDescription: jsonObject.applicant_description,
      applicantDescriptionHtml: jsonObject.applicant_description_html,
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
      fullTime: jsonObject.full_time,
      grossAmount: jsonObject.gross_amount,
      grossAmountDelimited: jsonObject.gross_amount_delimited,
      grossAmountWithCurrency: jsonObject.gross_amount_with_currency,
      hourlyPay: HourlyPayFactory.createHourlyPay(jsonObject.hourly_pay),
      hours: jsonObject.hours,
      id: jsonObject.id,
      invoiceAmount: jsonObject.invoice_amount,
      jobDate: jsonObject.job_date ? new Date(jsonObject.job_date) : jsonObject.job_date,
      jobEndDate: jsonObject.job_end_date ? new Date(jsonObject.job_end_date) : null,
      jobLanguages: map(jsonObject.job_languages, jobLanguage => JobLanguageFactory.createJobLanguage(jobLanguage)),
      jobSkills:  map(jsonObject.job_skills, jobSkill => JobSkillFactory.createJobSkill(jobSkill)),
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      lastApplicationAt: jsonObject.last_application_at,
      name: jsonObject.name,
      netAmount: jsonObject.net_amount,
      netAmountDelimited: jsonObject.net_amount_delimited,
      netAmountWithCurrency: jsonObject.net_amount_with_currency,
      openForApplications: jsonObject.open_for_applications,
      owner: UserFactory.createUser(jsonObject.owner),
      requirementsDescription: jsonObject.requirements_description,
      requirementsDescriptionHtml: jsonObject.requirements_description_html,
      responsibleRecruiter: UserFactory.createUser(jsonObject.responsible_recruiter),
      shortDescription: jsonObject.short_description,
      staffingJob: jsonObject.staffing_job,
      street: jsonObject.street,
      tasksDescription: jsonObject.tasks_description,
      tasksDescriptionHtml: jsonObject.tasks_description_html,
      translatedText: JobTranslatedTextFactory.createJobTranslatedText(jsonObject.translated_text),
      updatedAt: new Date(jsonObject.updated_at),
      zip: jsonObject.zip,
      zipLatitude: jsonObject.zip_latitude,
      zipLongitude: jsonObject.zip_longitude,
      schemaOrg: JobSchemaOrgFactory.create(jsonObject.schema_org),
    };
  }
}

class JobTranslatedTextFactory {
  public static createJobTranslatedText(jsonObject?: any): JobTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      applicantDescription: jsonObject.applicant_description,
      applicantDescriptionHtml: jsonObject.applicant_description_html,
      description: jsonObject.description,
      descriptionHtml: jsonObject.description_html,
      languageId: jsonObject.language_id,
      name: jsonObject.name,
      requirementsDescription: jsonObject.requirements_description,
      requirementsDescriptionHtml: jsonObject.requirements_description_html,
      shortDescription: jsonObject.short_description,
      tasksDescription: jsonObject.tasks_description,
      tasksDescriptionHtml: jsonObject.tasks_description_html,
    };
  }
}

class JobSchemaOrgFactory {
  public static create(jsonObject?: any): JobSchemaOrg {
    if (!jsonObject) {
      return;
    }

    return {
      jobPosition: jsonObject.job_position
    };
  }
}
