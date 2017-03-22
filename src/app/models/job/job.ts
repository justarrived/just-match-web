import {Company} from '../company/company';
import {map} from 'lodash';
import {User} from '../user/user';
import {UserJob} from '../user/user-job';

export class Job {
  private readonly companyPlaceholderLogoURL: string = '/assets/images/placeholder-logo.png';

  public amount: number;
  public category: Category;
  public city: string;
  public company: Company;
  public createdAt: string;
  public description: string;
  public descriptionHTML: string;
  public featured: boolean;
  public filled: boolean;
  public grossAmount: number;
  public grossAmountDelimited: string;
  public grossAmountWithCurrency: string;
  public hourlyPay: HourlyPay;
  public hours: number;
  public id: string;
  public invoiceAmount: number;
  public jobDate: string;
  public jobEndDate: string;
  public jobUsers: UserJob[];
  public languageId: string;
  public name: string;
  public netAmount: number;
  public netAmountDelimited: string;
  public netAmountWithCurrency: string;
  public owner: User;
  public shortDescription: string;
  public street: string;
  public translated: Job;
  public updatedAt: string;
  public verified: boolean;
  public zip: string;
  public zipLatitude: number;
  public zipLongitude: number;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.category = new Category(jsonObject.category);
    this.city = jsonObject.city;
    this.company = new Company(jsonObject.company);
    this.createdAt = jsonObject.created_at;
    this.description = jsonObject.description;
    this.descriptionHTML = jsonObject.description_html;
    this.featured = jsonObject.featured;
    this.filled = jsonObject.filled;
    this.grossAmount = jsonObject.gross_amount;
    this.grossAmountDelimited = jsonObject.gross_amount_delimited;
    this.grossAmountWithCurrency = jsonObject.gross_amount_with_currency;
    this.hourlyPay = new HourlyPay(jsonObject.hourly_pay);
    this.hours = jsonObject.hours;
    this.id = jsonObject.id;
    this.invoiceAmount = jsonObject.invoice_amount;
    this.jobDate = jsonObject.job_date;
    this.jobEndDate = jsonObject.job_end_date;
    this.jobUsers = map(jsonObject.job_users, user => new UserJob(user));
    this.languageId = jsonObject.language_id;
    this.name = jsonObject.name;
    this.netAmount = jsonObject.net_amount;
    this.netAmountDelimited = jsonObject.net_amount_delimited;
    this.netAmountWithCurrency = jsonObject.net_amount_with_currency;
    this.owner = new User(jsonObject.owner);
    this.shortDescription = jsonObject.short_description;
    this.street = jsonObject.street;
    this.updatedAt = jsonObject.updated_at;
    this.verified = jsonObject.verified;
    this.zip = jsonObject.zip;
    this.zipLatitude = jsonObject.zip_latitude;
    this.zipLongitude = jsonObject.zip_longitude;

    if (jsonObject.translated_text) {
      this.translated = new Job(jsonObject.translated_text);
    }
  }

  public get netSalary(): number {
    return this.hourlyPay.netSalary;
  }

  public get grossSalary(): number {
    return this.hourlyPay.grossSalary;
  }

  public get currency(): string {
    return this.hourlyPay.currency;
  }

  public get address(): string {
    return this.street + ', ' + this.zip;
  }

  public get companyLogoImageURL(): string {
    let logoImage = this.company.logoImage;
    if (logoImage && logoImage.imageUrlSmall) {
      return logoImage.imageUrlSmall;
    }

    return this.companyPlaceholderLogoURL;
  }
}

export class HourlyPay {
  public active: boolean;
  public currency: string;
  public grossSalary: number;
  public grossSalaryDelmited: string;
  public grossSalaryWithUnit: string;
  public id: string;
  public netSalary: number;
  public netSalaryDelmited: string;
  public netSalaryWithUnit: string;
  public rateIncludingVAT: number;
  public unit: string;

  public constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.active = jsonObject.active;
    this.currency = jsonObject.currency;
    this.grossSalary = jsonObject.gross_salary;
    this.grossSalaryDelmited = jsonObject.gross_salary_delmited;
    this.grossSalaryWithUnit = jsonObject.gross_salary_with_unit;
    this.id = jsonObject.id;
    this.netSalary = jsonObject.net_salary;
    this.netSalaryDelmited = jsonObject.net_salary_delmited;
    this.netSalaryWithUnit = jsonObject.net_salary_with_unit;
    this.rateIncludingVAT = jsonObject.rate_including_vat;
    this.unit = jsonObject.unit;
  }
}

export class Category {
  public id: string;
  public name: string;

  public constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
    this.name = jsonObject.name;
  }
}
