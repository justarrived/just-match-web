import {find} from "lodash";

export class Job {
  company: Company;
  createdAt: string;
  description: string;
  featured: boolean;
  filled: boolean;
  hourlyPay: HourlyPay;
  hours: number;
  id: string;
  jobData: string;
  jobEndDate: string;
  name: string;
  owner: any; //TODO;
  shortDescription: string;
  updatedAt: string;
  verified: boolean;
  zip: string;
  zipLatitude: number;
  zipLongitude: number;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }
    this.company = new Company(jsonObject.company);
    this.createdAt = jsonObject.created_at;
    this.description = jsonObject.description;
    this.featured = jsonObject.featured;
    this.filled = jsonObject.filled;
    this.hourlyPay = new HourlyPay(jsonObject.hourly_pay);
    this.hours = jsonObject.hours;
    this.id = jsonObject.id;
    this.jobData = jsonObject.job_data;
    this.jobEndDate = jsonObject.job_end_date;
    this.name = jsonObject.name;
    this.owner = jsonObject.owner;
    this.shortDescription = jsonObject.short_description;
    this.updatedAt = jsonObject.updated_at;
    this.verified = jsonObject.verified;
    this.zip = jsonObject.zip;
    this.zipLatitude = jsonObject.zip_latitude;
    this.zipLongitude = jsonObject.zip_longitude;
  }
}

class HourlyPay {
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

class Company {
  cin: string;
  city: string;
  companyLogo: CompanyImage;
  email: string;
  id: string;
  name: string;
  phone: string;
  street: string;
  website: string;
  zip: string;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }
    this.cin = jsonObject.cin;
    this.city = jsonObject.city;
    this.email = jsonObject.email;
    this.id = jsonObject.email;
    this.name = jsonObject.name;
    this.phone = jsonObject.phone;
    this.street = jsonObject.street;
    this.website = jsonObject.website;
    this.zip = jsonObject.zip;
    if (!!jsonObject.company_images && jsonObject.company_images.length > 0) {
      this.companyLogo = this.getCompanyLogo(jsonObject.company_images);
    }
  }

  private getCompanyLogo(companyImages: any): CompanyImage {
    return new CompanyImage(find(companyImages, {category_name: 'logo'}));
  }
}



class CompanyImage {
  categoryName: string;
  id: string;
  imageUrl: string;
  imageUrlLarge: string;
  imageUrlMedium: string;
  imageUrlSmall: string;
  oneTimeToken: string;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }
    this.categoryName = jsonObject.category_name;
    this.id = jsonObject.id;
    this.imageUrl = jsonObject.image_url;
    this.imageUrlLarge = jsonObject.image_url_large;
    this.imageUrlMedium = jsonObject.image_url_medium;
    this.imageUrlSmall = jsonObject.image_url_small;
    this.oneTimeToken = jsonObject.one_time_token;
  }
}
