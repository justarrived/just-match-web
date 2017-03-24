import {Application} from '../application/application';
import {Category} from '../category/category';
import {Company} from '../company/company';
import {HourlyPay} from '../hourly-pay/hourly-pay';
import {map} from 'lodash';
import {User} from '../user/user';

export class Job {
  // API fields
  public applications: Application[];
  public category: Category;
  public city: string;
  public company: Company;
  public createdAt: Date;
  public currency: string;
  public description: string;
  public descriptionHtml: string;
  public directRecruitmentJob: boolean;
  public featured: boolean;
  public filled: boolean;
  public fullStreetAddress: string;
  public grossAmount: number;
  public grossAmountDelimited: string;
  public grossAmountWithCurrency: string;
  public hourlyPay: HourlyPay;
  public hours: number;
  public id: string;
  public invoiceAmount: number;
  public jobDate: Date;
  public jobEndDate: Date;
  public languageId: string;
  public name: string;
  public netAmount: number;
  public netAmountDelimited: string;
  public netAmountWithCurrency: string;
  public owner: User;
  public shortDescription: string;
  public staffingJob: boolean;
  public street: string;
  public translatedText: JobTranslatedText;
  public upcoming: boolean;
  public updatedAt: Date;
  public verified: boolean;
  public zip: string;
  public zipLatitude: number;
  public zipLongitude: number;

  // Client fields
  private readonly companyPlaceholderLogoURL: string = '/assets/images/placeholder-logo.png';

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.applications = map(jsonObject.job_users, application => new Application(application));
    this.category = new Category(jsonObject.category);
    this.city = jsonObject.city;
    this.company = new Company(jsonObject.company);
    this.createdAt = new Date(jsonObject.created_at);
    this.currency = jsonObject.currency;
    this.description = jsonObject.description;
    this.descriptionHtml = jsonObject.description_html;
    this.directRecruitmentJob = jsonObject.direct_recruitment_job;
    this.featured = jsonObject.featured;
    this.filled = jsonObject.filled;
    this.fullStreetAddress = jsonObject.full_street_address;
    this.grossAmount = jsonObject.gross_amount;
    this.grossAmountDelimited = jsonObject.gross_amount_delimited;
    this.grossAmountWithCurrency = jsonObject.gross_amount_with_currency;
    this.hourlyPay = new HourlyPay(jsonObject.hourly_pay);
    this.hours = jsonObject.hours;
    this.id = jsonObject.id;
    this.invoiceAmount = jsonObject.invoice_amount;
    this.jobDate = new Date(jsonObject.job_date);
    this.jobEndDate = new Date(jsonObject.job_end_date);
    this.languageId = jsonObject.language_id;
    this.name = jsonObject.name;
    this.netAmount = jsonObject.net_amount;
    this.netAmountDelimited = jsonObject.net_amount_delimited;
    this.netAmountWithCurrency = jsonObject.net_amount_with_currency;
    this.owner = new User(jsonObject.owner);
    this.shortDescription = jsonObject.short_description;
    this.staffingJob = jsonObject.staffingJob;
    this.street = jsonObject.street;
    this.translatedText = new JobTranslatedText(jsonObject.translated_text);
    this.upcoming = jsonObject.upcoming;
    this.updatedAt = new Date(jsonObject.updated_at);
    this.verified = jsonObject.verified;
    this.zip = jsonObject.zip;
    this.zipLatitude = jsonObject.zip_latitude;
    this.zipLongitude = jsonObject.zip_longitude;
  }
}

export class JobTranslatedText {
  // API fields
  public description: string;
  public descriptionHtml: string;
  public languageId: string;
  public name: string;
  public shortDescription: string;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.description = jsonObject.description;
    this.descriptionHtml = jsonObject.description_html;
    this.languageId = jsonObject.language_id;
    this.name = jsonObject.name;
    this.shortDescription = jsonObject.short_description;
  }
}
