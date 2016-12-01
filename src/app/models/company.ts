import {find} from "lodash";

export class Company {
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
    this.id = jsonObject.id;
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
