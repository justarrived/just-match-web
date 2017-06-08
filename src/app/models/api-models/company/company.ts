import {CompanyImage} from '../company-image/company-image';
import {CompanyImageFactory} from '../company-image/company-image';
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
  shortDescription: string;
  shortDescriptionHtml: string;
  street: string;
  translatedText: CompanyTranslatedText;
  users: User[];
  website: string;
  zip: string;
}

interface CompanyTranslatedTextApiAttributes {
  shortDescription: string;
  shortDescriptionHtml: string;
}

// Client interfaces
export interface Company extends CompanyApiAttributes {
  logoImage: CompanyImage;
}

export interface CompanyTranslatedText extends CompanyTranslatedTextApiAttributes {
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
      shortDescription: jsonObject.short_description,
      shortDescriptionHtml: jsonObject.short_description_html,
      street: jsonObject.street,
      translatedText: CompanyTranslatedTextFactory.createCompanyTranslatedText(jsonObject.translated_text),
      users: map(jsonObject.users, user => UserFactory.createUser(user)),
      website: jsonObject.website,
      zip: jsonObject.zip,
    };
  }

  private static getCompanyImageByCategory(companyImages: CompanyImage[], category: string): CompanyImage {
    return companyImages.find(image => image.categoryName === category);
  }
}

class CompanyTranslatedTextFactory {
  public static createCompanyTranslatedText(jsonObject?: any): CompanyTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      shortDescription: jsonObject.short_description,
      shortDescriptionHtml: jsonObject.short_description_html,
    };
  }
}
