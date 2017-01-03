import {UserImage} from './user/user-image';
import {map, find} from 'lodash';
import {UserLanguage} from './user/user-language';
import {Company} from './company';
import {Country} from './country';

export class User {
  id: number;
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
  password: string;
  oldPassword: string;
  countryOfOriginCode: string;
  residencePermit: string;

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
    this.profileImage = this.getProfileImage();
    this.languageId = jsonObject.language_id;
    this.countryOfOriginCode = jsonObject.country_of_origin;
    this.residencePermit = jsonObject.residence_permit;
  }

  getNativeLanguage(): UserLanguage {
    return this.userLanguages.find(language => language.proficiency.proficiency === 5);
  }

  getProfileImage(): UserImage {
    return this.images.find(image => image.category === 'profile');
  }

  toJsonObject(): Object {
    return {
      'id': this.id,
      'email': this.email,
      'description': this.presentation,
      'language_ids': map(this.userLanguages, userLanguage => {
        return {
          id: userLanguage.language.id,
          proficiency: userLanguage.proficiency.proficiency
        };
      }),
      'job_experience': this.workExperience,
      'education': this.education,
      'competence_text': this.skills,
      'ssn': this.ssn,
      'first_name': this.firstName,
      'last_name': this.lastName,
      'phone': this.phone,
      'language_id': this.languageId,
      'password': this.password,
      'old_password': this.oldPassword,
      'country_of_origin': this.countryOfOriginCode,
      'residence_permit': this.residencePermit
    };
  }
}
