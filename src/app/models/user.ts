import {UserImage} from './user/user-image';
import {map, find} from 'lodash';
import {UserLanguage} from './user/user-language';
import {Company} from './company';

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  images: UserImage[];
  userLanguages: UserLanguage[];
  presentation: string;
  workExperience: string;
  education: string;
  skills: string;
  frilansFinansPaymentDetails: boolean;
  company: Company;
  profileImage: UserImage;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
    this.firstName = jsonObject.first_name;
    this.lastName = jsonObject.last_name;
    this.email = jsonObject.email;
    this.role = jsonObject.primary_role;
    this.images = map(jsonObject.user_images, userImage => new UserImage(userImage));
    this.userLanguages = map(jsonObject.user_languages, userLanguage => new UserLanguage(userLanguage));
    this.presentation = jsonObject.description;
    this.workExperience = jsonObject.job_experience;
    this.education = jsonObject.education;
    this.skills = jsonObject.competence_text;
    this.company = new Company(jsonObject.company);
    this.frilansFinansPaymentDetails = jsonObject.frilans_finans_payment_details;
    this.profileImage = this.getProfileImage(jsonObject.user_images);
  }

  private getProfileImage(userImages: any): UserImage {
    return new UserImage(find(userImages, {category_name: 'profile'}));
  }

  toJsonObject(): Object {
    return {
      'email': this.email,
      'primary-role': this.role
    };
  }
}
