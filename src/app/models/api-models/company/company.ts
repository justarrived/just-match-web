import {CompanyImage} from './company-image';
import {CompanyImageFactory} from './company-image';
import {map} from 'lodash';
import {User} from '../user/user';
import {UserFactory} from '../user/user';

// API attribute interfaces
interface CompanyApiAttributes {
  cin: string;
  city: string;
  companyImages: CompanyImage[];
  email: string;
  id: string;
  name: string;
  phone: string;
  street: string;
  users: User[];
  website: string;
  zip: string;
}

// Client interfaces
export interface Company extends CompanyApiAttributes {
  logoImage: CompanyImage;
}

// Factories
export class CompanyFactory {
  public static createCompany(jsonObject?: any): Company {
    if (!jsonObject) {
      return;
    }

    const companyImages = map(jsonObject.company_images, companyImage => CompanyImageFactory.createCompanyImage(companyImage));

    return {
      cin: jsonObject.cin,
      city: jsonObject.city,
      companyImages: companyImages,
      email: jsonObject.email,
      id: jsonObject.id,
      logoImage: CompanyFactory.getCompanyImageByCategory(companyImages, 'logo'),
      name: jsonObject.name,
      phone: jsonObject.phone,
      street: jsonObject.street,
      users: map(jsonObject.users, user => UserFactory.createUser(user)),
      website: jsonObject.website,
      zip: jsonObject.zip,
    };
  }

  private static getCompanyImageByCategory(companyImages: CompanyImage[], category: string): CompanyImage {
    return companyImages.find(image => image.categoryName === category);
  }
}
