import {Company} from './company';
import {Country} from './country';
import {find} from 'lodash';
import {map} from 'lodash'
import {UserDocument} from './user/user-document';
import {UserImage} from './user/user-image';
import {UserInterest} from './user/user-interest';
import {UserLanguage} from './user/user-language';
import {UserSkill} from './user/user-skill';

export class User {
  public accountClearingNumber: string;
  public accountNumber: string;
  public admin: boolean;
  public atUnd: string;
  public city: string;
  public company: Company;
  public countryOfOriginCode: string;
  public currentStatus: string;
  public cvDocuments: UserDocument[];
  public description: string;
  public documents: UserDocument[];
  public education: string;
  public email: string;
  public firstName: string;
  public frilansFinansPaymentDetails: boolean;
  public id: string;
  public images: UserImage[];
  public justArrivedStaffing: boolean;
  public languageId: string;
  public lastName: string;
  public lma_card_image: UserImage;
  public name: string;
  public newPassword: string;
  public oldPassword: string;
  public personal_id_image: UserImage;
  public phone: string;
  public profile_image: UserImage;
  public repeatedPassword: string;
  public residence_permit_back_image: UserImage;
  public residence_permit_front_image: UserImage;
  public role: string;
  public skatteverket_certificate_image: UserImage;
  public skills: string;
  public ssn: string;
  public street: string;
  public supportChatActivated: boolean;
  public translated: User;
  public userLanguages: UserLanguage[];
  public userInterests: UserInterest[];
  public userSkills: UserSkill[];
  public workExperience: string;
  public zip: string;

  constructor(jsonObject: any) {
    if (!jsonObject) {
      return;
    }

    this.accountClearingNumber = jsonObject.account_clearing_number;
    this.accountNumber = jsonObject.account_number;
    this.admin = jsonObject.admin;
    this.atUnd = jsonObject.at_und;
    this.city = jsonObject.city;
    this.company = new Company(jsonObject.company);
    this.countryOfOriginCode = jsonObject.country_of_origin;
    this.currentStatus = jsonObject.current_status;
    this.description = jsonObject.description;
    this.documents = map(jsonObject.user_documents, userDocument => new UserDocument(userDocument));
    this.education = jsonObject.education;
    this.email = jsonObject.email;
    this.firstName = jsonObject.first_name;
    this.frilansFinansPaymentDetails = jsonObject.frilans_finans_payment_details;
    this.id = jsonObject.id;
    this.images = map(jsonObject.user_images, userImage => new UserImage(userImage));
    this.justArrivedStaffing = jsonObject.just_arrived_staffing;
    this.languageId = jsonObject.language_id;
    this.lastName = jsonObject.last_name;
    this.name = jsonObject.name;
    this.phone = jsonObject.phone;
    this.role = jsonObject.primary_role;
    this.skills = jsonObject.competence_text;
    this.ssn = jsonObject.ssn;
    this.street = jsonObject.street;
    this.supportChatActivated = jsonObject.supportChatActivated;
    this.userLanguages = map(jsonObject.user_languages, userLanguage => new UserLanguage(userLanguage));
    this.userInterests = map(jsonObject.user_interests, userInterest => new UserInterest(userInterest));
    this.userSkills = map(jsonObject.user_skills, userSkill => new UserSkill(userSkill));
    this.workExperience = jsonObject.job_experience;
    this.zip = jsonObject.zip;

    this.cvDocuments = this.getDocumentByCategory('cv');

    this.lma_card_image = this.getImageByCategory('lma_card');
    this.personal_id_image = this.getImageByCategory('personal_id');
    this.profile_image = this.getImageByCategory('profile');
    this.residence_permit_back_image = this.getImageByCategory('residence_permit_back');
    this.residence_permit_front_image = this.getImageByCategory('residence_permit_front');
    this.skatteverket_certificate_image = this.getImageByCategory('skatteverket_certificate');

    if (jsonObject.translated_text) {
      this.translated = new User(jsonObject.translated_text);
    }
  }

  getImageByCategory(category): UserImage {
    return this.images.find(image => image.category === category);
  }

  getDocumentByCategory(category): UserDocument[] {
    return this.documents.filter(document => document.category === category);
  }
}
