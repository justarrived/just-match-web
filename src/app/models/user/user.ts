import {Company} from '../company/company';
import {Country} from '../country/country';
import {map} from 'lodash';
import {UserDocument} from './user-document';
import {UserImage} from './user-image';
import {UserInterest} from './user-interest';
import {UserLanguage} from './user-language';
import {UserSkill} from './user-skill';

export class User {
  // API fields
  public accountClearingNumber: string;
  public accountNumber: string;
  public admin: boolean;
  public anonymized: boolean;
  public arrivedAt: Date;
  public atUnd: string;
  public city: string;
  public company: Company;
  public competenceText: string;
  public competenceTextHtml: string;
  public countryOfOriginCode: string;
  public createdAt: Date;
  public currentStatus: string;
  public description: string;
  public descriptionHtml: string;
  public education: string;
  public educationHtml: string;
  public email: string;
  public firstName: string;
  public frilansFinansPaymentDetails: boolean;
  public fullStreetAddress: string;
  public gender: string;
  public id: string;
  public ignoredNotifications: string[];
  public jobExperience: string;
  public jobExperienceHtml: string;
  public justArrivedStaffing: boolean;
  public languageId: string;
  public lastName: string;
  public latitude: number;
  public longitude: number;
  public name: string;
  public phone: string;
  public primaryRole: string;
  public ssn: string;
  public street: string;
  public supportChatActivated: boolean;
  public translatedText: UserTranslatedText;
  public updatedAt: Date;
  public userDocuments: UserDocument[];
  public userImages: UserImage[];
  public userInterests: UserInterest[];
  public userLanguages: UserLanguage[];
  public userSkills: UserSkill[];
  public zip: string;
  public zipLatitude: number;
  public zipLongitude: number;

  // Client fields
  public cvDocuments: UserDocument[];
  public isBeingReloaded: boolean;
  public lmaCardImage: UserImage;
  public personalIdImage: UserImage;
  public profileImage: UserImage;
  public residencePermitBackImage: UserImage;
  public residencePermitFrontImage: UserImage;
  public skatteverketCertificateImage: UserImage;
  public workPermitBackImage: UserImage;
  public workPermitFrontImage: UserImage;

  constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.accountClearingNumber = jsonObject.account_clearing_number;
    this.accountNumber = jsonObject.account_number;
    this.admin = jsonObject.admin;
    this.anonymized = jsonObject.anonymized;
    this.arrivedAt = new Date(jsonObject.arrived_at);
    this.atUnd = jsonObject.at_und;
    this.city = jsonObject.city;
    this.company = new Company(jsonObject.company);
    this.competenceText = jsonObject.competence_text;
    this.competenceTextHtml = jsonObject.competence_text_html;
    this.countryOfOriginCode = jsonObject.country_of_origin;
    this.createdAt = new Date(jsonObject.created_at);
    this.currentStatus = jsonObject.current_status;
    this.description = jsonObject.description;
    this.descriptionHtml = jsonObject.description_html;
    this.education = jsonObject.education;
    this.educationHtml = jsonObject.education_html;
    this.email = jsonObject.email;
    this.firstName = jsonObject.first_name;
    this.frilansFinansPaymentDetails = jsonObject.frilans_finans_payment_details;
    this.fullStreetAddress = jsonObject.full_street_address;
    this.gender = jsonObject.gender;
    this.id = jsonObject.id;
    this.ignoredNotifications = jsonObject.ignored_notifications;
    this.jobExperience = jsonObject.job_experience;
    this.jobExperienceHtml = jsonObject.job_experience_html;
    this.justArrivedStaffing = jsonObject.just_arrived_staffing;
    this.languageId = jsonObject.language_id;
    this.lastName = jsonObject.last_name;
    this.latitude = jsonObject.latitude;
    this.longitude = jsonObject.longitude;
    this.name = jsonObject.name;
    this.phone = jsonObject.phone;
    this.primaryRole = jsonObject.primary_role;
    this.ssn = jsonObject.ssn;
    this.street = jsonObject.street;
    this.supportChatActivated = jsonObject.support_chat_activated;
    this.translatedText = new UserTranslatedText(jsonObject.translated_text);
    this.updatedAt = new Date(jsonObject.updated_at);
    this.userDocuments = map(jsonObject.user_documents, userDocument => new UserDocument(userDocument));
    this.userImages = map(jsonObject.user_images, userImage => new UserImage(userImage));
    this.userInterests = map(jsonObject.user_interests, userInterest => new UserInterest(userInterest));
    this.userLanguages = map(jsonObject.user_languages, userLanguage => new UserLanguage(userLanguage));
    this.userSkills = map(jsonObject.user_skills, userSkill => new UserSkill(userSkill));
    this.zip = jsonObject.zip;
    this.zipLatitude = jsonObject.zip_latitude;
    this.zipLongitude = jsonObject.zip_longitude;

    this.cvDocuments = this.getUserDocumentByCategory('cv');
    this.lmaCardImage = this.getUserImageByCategory('lma_card');
    this.personalIdImage = this.getUserImageByCategory('personal_id');
    this.profileImage = this.getUserImageByCategory('profile');
    this.residencePermitBackImage = this.getUserImageByCategory('residence_permit_back');
    this.residencePermitFrontImage = this.getUserImageByCategory('residence_permit_front');
    this.skatteverketCertificateImage = this.getUserImageByCategory('skatteverket_certificate');
    this.workPermitBackImage = this.getUserImageByCategory('work_permit_back');
    this.workPermitFrontImage = this.getUserImageByCategory('work_permit_front');
  }

  private getUserImageByCategory(category): UserImage {
    return this.userImages.find(image => image.category === category);
  }

  private getUserDocumentByCategory(category): UserDocument[] {
    return this.userDocuments.filter(document => document.category === category);
  }
}

export class UserTranslatedText {
  // API fields
  public competenceText: string;
  public competenceTextHtml: string;
  public description: string;
  public descriptionHtml: string;
  public education: string;
  public educationHtml: string;
  public jobExperience: string;
  public jobExperienceHtml: string;
  public languageId: string;

  public constructor(jsonObject?: any) {
    if (!jsonObject) {
      return;
    }

    this.competenceText = jsonObject.competence_text;
    this.competenceTextHtml = jsonObject.competence_text_html;
    this.description = jsonObject.description;
    this.descriptionHtml = jsonObject.description_html;
    this.education = jsonObject.education;
    this.educationHtml = jsonObject.education_html;
    this.jobExperience = jsonObject.job_experience;
    this.jobExperienceHtml = jsonObject.job_experience_html;
    this.languageId = jsonObject.language_id;
  }
}
