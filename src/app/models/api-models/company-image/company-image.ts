import {Company} from '../company/company';
import {CompanyFactory} from '../company/company';

// API attribute interfaces
interface CompanyImageApiAttributes {
  categoryName: string;
  company: Company;
  id: string;
  imageUrl: string;
  imageUrlLarge: string;
  imageUrlMedium: string;
  imageUrlSmall: string;
  oneTimeToken: string;
  oneTimeTokenExpiresAt: Date;
}

// Client interfaces
export interface CompanyImage extends CompanyImageApiAttributes {
}

// Factories
export class CompanyImageFactory {
  public static createCompanyImage(jsonObject?: any): CompanyImage {
    if (!jsonObject) {
      return;
    }

    return {
      categoryName: jsonObject.category_name,
      company: CompanyFactory.createCompany(jsonObject.company),
      id: jsonObject.id,
      imageUrl: jsonObject.image_url,
      imageUrlLarge: jsonObject.image_url_large,
      imageUrlMedium: jsonObject.image_url_medium,
      imageUrlSmall: jsonObject.image_url_small,
      oneTimeToken: jsonObject.one_time_token,
      oneTimeTokenExpiresAt: new Date(jsonObject.one_time_token_expires_at),
    };
  }
}
