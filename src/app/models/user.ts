import {UserImage} from './user/user-image';
import {map, find} from 'lodash';
import {UserLanguage} from './user/user-language';
import {Company} from './company';
import {Country} from './country';

export class User {
  id: string;
  ssn: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  images: UserImage[];
  userLanguages: UserLanguage[];
  presentation: string;
  workExperience: string;
  education: string;
  skills: string;
  languageId: number;
  frilansFinansPaymentDetails: boolean;
  company: Company;
  profileImage: UserImage;
  permitImage: UserImage;
  countryOfOriginCode: string;
  currentStatus: string;
  accountClearingNumber: string;
  accountNumber: string;
  newPassword: string;
  repeatedPassword: string;
  oldPassword: string;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.id = jsonObject.id;
    this.ssn = jsonObject.ssn;
    this.firstName = jsonObject.first_name;
    this.lastName = jsonObject.last_name;
    this.email = jsonObject.email;
    this.phone = jsonObject.phone;
    this.role = jsonObject.primary_role;
    this.images = map(jsonObject.user_images, userImage => new UserImage(userImage));
    this.userLanguages = map(jsonObject.user_languages, userLanguage => new UserLanguage(userLanguage));
    this.presentation = jsonObject.description;
    this.workExperience = jsonObject.job_experience;
    this.education = jsonObject.education;
    this.skills = jsonObject.competence_text;
    this.company = new Company(jsonObject.company);
    this.frilansFinansPaymentDetails = jsonObject.frilans_finans_payment_details;
    this.profileImage = this.getImageByCategory('profile');
    this.permitImage = this.getImageByCategory('work_permit');
    this.languageId = jsonObject.language_id;
    this.countryOfOriginCode = jsonObject.country_of_origin;
    this.currentStatus = jsonObject.current_status;
    this.accountClearingNumber = jsonObject.account_clearing_number;
    this.accountNumber = jsonObject.account_number;
  }

  getNativeLanguage(): UserLanguage {
    return this.userLanguages.find(language => language.proficiency.proficiency === 5);
  }

  getImageByCategory(category): UserImage {
    return this.images.find(image => image.category === category);
  }
}
