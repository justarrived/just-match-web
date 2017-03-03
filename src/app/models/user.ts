import {UserImage} from './user/user-image';
import {UserDocument} from './user/user-document';
import {map, find} from 'lodash';
import {UserLanguage} from './user/user-language';
import {UserSkill} from './user/user-skill';
import {Company} from './company';
import {Country} from './country';

export class User {
  id: string;
  ssn: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  street: string;
  zip: string;
  city: string;
  role: string;
  admin: boolean;
  images: UserImage[];
  documents: UserDocument[];
  userLanguages: UserLanguage[];
  userSkills: UserSkill[];
  presentation: string;
  workExperience: string;
  education: string;
  skills: string;
  languageId: string;
  frilansFinansPaymentDetails: boolean;
  company: Company;
  profile_image: UserImage;
  personal_id_image: UserImage;
  residence_permit_front_image: UserImage;
  residence_permit_back_image: UserImage;
  lma_card_image: UserImage;
  skatteverket_certificate_image: UserImage;
  cvDocuments: UserDocument[];
  countryOfOriginCode: string;
  currentStatus: string;
  atUnd: string;
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
    this.street = jsonObject.street;
    this.zip = jsonObject.zip;
    this.city = jsonObject.city;
    this.role = jsonObject.primary_role;
    this.admin = jsonObject.admin;
    this.images = map(jsonObject.user_images, userImage => new UserImage(userImage));
    this.documents = map(jsonObject.user_documents, userDocument => new UserDocument(userDocument));
    this.userLanguages = map(jsonObject.user_languages, userLanguage => new UserLanguage(userLanguage));
    this.userSkills = map(jsonObject.user_skills, userSkill => new UserSkill(userSkill));
    this.presentation = jsonObject.description;
    this.workExperience = jsonObject.job_experience;
    this.education = jsonObject.education;
    this.skills = jsonObject.competence_text;
    this.company = new Company(jsonObject.company);
    this.frilansFinansPaymentDetails = jsonObject.frilans_finans_payment_details;
    this.profile_image = this.getImageByCategory('profile');
    this.personal_id_image = this.getImageByCategory('personal_id');
    this.residence_permit_front_image = this.getImageByCategory('residence_permit_front');
    this.residence_permit_back_image = this.getImageByCategory('residence_permit_back');
    this.lma_card_image = this.getImageByCategory('lma_card');
    this.skatteverket_certificate_image = this.getImageByCategory('skatteverket_certificate');
    this.cvDocuments = this.getDocumentsByCategory('cv');
    this.languageId = jsonObject.language_id;
    this.countryOfOriginCode = jsonObject.country_of_origin;
    this.currentStatus = jsonObject.current_status;
    this.atUnd = jsonObject.at_und;
    this.accountClearingNumber = jsonObject.account_clearing_number;
    this.accountNumber = jsonObject.account_number;
  }

  getNativeLanguage(): UserLanguage {
    return this.userLanguages.find(language => language.proficiency && language.proficiency.proficiency === 5);
  }

  getImageByCategory(category): UserImage {
    return this.images.find(image => image.category === category);
  }

  getDocumentsByCategory(category): UserDocument[] {
    return this.documents.filter(document => document.category === category);
  }
}
