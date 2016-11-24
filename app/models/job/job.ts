import {Company} from "../company";

export class Job {
  amount: number;
  company: Company;
  createdAt: string;
  description: string;
  featured: boolean;
  filled: boolean;
  hourlyPay: HourlyPay;
  hours: number;
  id: string;
  invoiceAmount: number;
  jobDate: string;
  jobEndDate: string;
  name: string;
  owner: any; //TODO;
  shortDescription: string;
  street: string;
  updatedAt: string;
  verified: boolean;
  zip: string;
  zipLatitude: number;
  zipLongitude: number;
  category: Category;
  languageId: string;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }
    this.amount = jsonObject.amount;
    this.company = new Company(jsonObject.company);
    this.createdAt = jsonObject.created_at;
    this.description = jsonObject.description;
    this.featured = jsonObject.featured;
    this.filled = jsonObject.filled;
    this.hourlyPay = new HourlyPay(jsonObject.hourly_pay);
    this.hours = jsonObject.hours;
    this.id = jsonObject.id;
    this.invoiceAmount = jsonObject.invoice_amount;
    this.jobDate = jsonObject.job_date;
    this.jobEndDate = jsonObject.job_end_date;
    this.name = jsonObject.name;
    this.owner = jsonObject.owner;
    this.shortDescription = jsonObject.short_description;
    this.street = jsonObject.street;
    this.updatedAt = jsonObject.updated_at;
    this.verified = jsonObject.verified;
    this.zip = jsonObject.zip;
    this.zipLatitude = jsonObject.zip_latitude;
    this.zipLongitude = jsonObject.zip_longitude;
    this.category = new Category(jsonObject.category);
    this.languageId = jsonObject.language_id;
  }

  toJsonObject(): Object {
    return {
      'name': this.name,
      'category_id': this.category.id,
      'description': this.description,
      'short_description': this.shortDescription,
      'street': this.street,
      'zip': this.zip,
      'job_date': this.jobDate,
      'job_end_date': this.jobEndDate,
      'hours': this.hours,
      'hourly_pay_id': this.hourlyPay.id,
      'language_id': this.languageId
    };
  }
}

export class HourlyPay {
  active: boolean;
  currency: string;
  grossSalary: number;
  id: string;
  netSalary: number;
  rateExcludingVAT: number;
  rateIncludingVAT: number;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }
    this.active = jsonObject.active;
    this.currency = jsonObject.currency;
    this.grossSalary = jsonObject.gross_salary;
    this.id = jsonObject.id;
    this.netSalary = jsonObject.net_salary;
    this.rateExcludingVAT = jsonObject.rate_excluding_vat;
    this.rateIncludingVAT = jsonObject.rate_including_vat;
  }
}

export class Category {
  id: string;
  name: string;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }
    this.id = jsonObject.id;
    this.name = jsonObject.name;
  }
}