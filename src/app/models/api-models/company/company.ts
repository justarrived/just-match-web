import {CompanyImage} from './company-image';
import {map} from 'lodash';
import {User} from '../user/user';

export class Company {
  // API fields
  public cin: string;
  public city: string;
  public companyImages: CompanyImage[];
  public email: string;
  public id: string;
  public name: string;
  public phone: string;
  public street: string;
  public users: User[];
  public website: string;
  public zip: string;

  // Client fields
  public logoImage: CompanyImage;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.cin = jsonObject.cin;
    this.city = jsonObject.city;
    this.companyImages = map(jsonObject.company_images, companyImage => new CompanyImage(companyImage));
    this.email = jsonObject.email;
    this.id = jsonObject.id;
    this.name = jsonObject.name;
    this.phone = jsonObject.phone;
    this.street = jsonObject.street;
    this.users = map(jsonObject.users, user => new User(user));
    this.website = jsonObject.website;
    this.zip = jsonObject.zip;

    this.logoImage = this.getCompanyImageByCategory('logo');
  }

  private getCompanyImageByCategory(category): CompanyImage {
    return this.companyImages.find(image => image.categoryName === category);
  }
}
