import {Company} from '../company/company';
import {CompanyFactory} from '../company/company';
import {Country} from '../country/country';
import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';
import {map} from 'lodash';
import {UserDocument} from './user-document';
import {UserDocumentFactory} from './user-document';
import {UserImage} from './user-image';
import {UserImageFactory} from './user-image';
import {UserInterest} from './user-interest';
import {UserInterestFactory} from './user-interest';
import {UserLanguage} from './user-language';
import {UserLanguageFactory} from './user-language';
import {UserSkill} from './user-skill';
import {UserSkillFactory} from './user-skill';

// API attribute interfaces
interface UserApiAttributes {
  accountClearingNumber: string;
  accountNumber: string;
  admin: boolean;
  anonymized: boolean;
  arrivedAt: Date;
  atUnd: string;
  city: string;
  company: Company;
  competenceText: string;
  competenceTextHtml: string;
  countryOfOriginCode: string;
  createdAt: Date;
  currentStatus: string;
  description: string;
  descriptionHtml: string;
  education: string;
  educationHtml: string;
  email: string;
  firstName: string;
  frilansFinansPaymentDetails: boolean;
  fullStreetAddress: string;
  gender: string;
  id: string;
  ignoredNotifications: string[];
  jobExperience: string;
  jobExperienceHtml: string;
  justArrivedStaffing: boolean;
  languageId: string;
  language: Language;
  lastName: string;
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
  primaryRole: string;
  ssn: string;
  street: string;
  supportChatActivated: boolean;
  translatedText: UserTranslatedText;
  updatedAt: Date;
  userDocuments: UserDocument[];
  userImages: UserImage[];
  userInterests: UserInterest[];
  userLanguages: UserLanguage[];
  userSkills: UserSkill[];
  zip: string;
  zipLatitude: number;
  zipLongitude: number;
}

interface UserTranslatedTextApiAttributes {
  competenceText: string;
  competenceTextHtml: string;
  description: string;
  descriptionHtml: string;
  education: string;
  educationHtml: string;
  jobExperience: string;
  jobExperienceHtml: string;
  languageId: string;
}

// Client interfaces
export interface User extends UserApiAttributes {
  cvDocuments: UserDocument[];
  isBeingReloaded: boolean;
  lmaCardImage: UserImage;
  personalIdImage: UserImage;
  profileImage: UserImage;
  residencePermitBackImage: UserImage;
  residencePermitFrontImage: UserImage;
  skatteverketCertificateImage: UserImage;
  workPermitBackImage: UserImage;
  workPermitFrontImage: UserImage;
}

export interface UserTranslatedText extends UserTranslatedTextApiAttributes {
}

// Factories
export class UserFactory {
  public static createUser(jsonObject?: any): User {
    if (!jsonObject) {
      return;
    }

    const userDocuments = map(jsonObject.user_documents, userDocument => UserDocumentFactory.createUserDocument(userDocument));
    const userImages = map(jsonObject.user_images, userImage => UserImageFactory.createUserImage(userImage));

    return {
      accountClearingNumber: jsonObject.account_clearing_number,
      accountNumber: jsonObject.account_number,
      admin: jsonObject.admin,
      anonymized: jsonObject.anonymized,
      arrivedAt: new Date(jsonObject.arrived_at),
      atUnd: jsonObject.at_und,
      city: jsonObject.city,
      company: CompanyFactory.createCompany(jsonObject.company),
      competenceText: jsonObject.competence_text,
      competenceTextHtml: jsonObject.competence_text_html,
      countryOfOriginCode: jsonObject.country_of_origin,
      createdAt: new Date(jsonObject.created_at),
      currentStatus: jsonObject.current_status,
      cvDocuments: UserFactory.getUserDocumentsByCategory(userDocuments, 'cv'),
      description: jsonObject.description,
      descriptionHtml: jsonObject.description_html,
      education: jsonObject.education,
      educationHtml: jsonObject.education_html,
      email: jsonObject.email,
      firstName: jsonObject.first_name,
      frilansFinansPaymentDetails: jsonObject.frilans_finans_payment_details,
      fullStreetAddress: jsonObject.full_street_address,
      gender: jsonObject.gender,
      id: jsonObject.id,
      ignoredNotifications: jsonObject.ignored_notifications,
      isBeingReloaded: false,
      jobExperience: jsonObject.job_experience,
      jobExperienceHtml: jsonObject.job_experience_html,
      justArrivedStaffing: jsonObject.just_arrived_staffing,
      language: LanguageFactory.createLanguage(jsonObject.language),
      languageId: jsonObject.language_id,
      lastName: jsonObject.last_name,
      latitude: jsonObject.latitude,
      lmaCardImage: UserFactory.getUserImageByCategory(userImages, 'lma_card'),
      longitude: jsonObject.longitude,
      name: jsonObject.name,
      personalIdImage: UserFactory.getUserImageByCategory(userImages, 'personal_id'),
      phone: jsonObject.phone,
      primaryRole: jsonObject.primary_role,
      profileImage: UserFactory.getUserImageByCategory(userImages, 'profile'),
      residencePermitBackImage: UserFactory.getUserImageByCategory(userImages, 'residence_permit_back'),
      residencePermitFrontImage: UserFactory.getUserImageByCategory(userImages, 'residence_permit_front'),
      skatteverketCertificateImage: UserFactory.getUserImageByCategory(userImages, 'skatteverket_certificate'),
      ssn: jsonObject.ssn,
      street: jsonObject.street,
      supportChatActivated: jsonObject.support_chat_activated,
      translatedText: UserTranslatedTextFactory.createUserTranslatedText(jsonObject.translated_text),
      updatedAt: new Date(jsonObject.updated_at),
      userDocuments: userDocuments,
      userImages: userImages,
      userInterests: map(jsonObject.user_interests, userInterest => UserInterestFactory.createUserInterest(userInterest)),
      userLanguages: map(jsonObject.user_languages, userLanguage => UserLanguageFactory.createUserLanguage(userLanguage)),
      userSkills: map(jsonObject.user_skills, userSkill => UserSkillFactory.createUserSkill(userSkill)),
      workPermitBackImage: UserFactory.getUserImageByCategory(userImages, 'work_permit_back'),
      workPermitFrontImage: UserFactory.getUserImageByCategory(userImages, 'work_permit_front'),
      zip: jsonObject.zip,
      zipLatitude: jsonObject.zip_latitude,
      zipLongitude: jsonObject.zip_longitude,
    };
  }

  private static getUserImageByCategory(userImages: UserImage[], category: string): UserImage {
    return userImages.find(image => image.category === category);
  }

  private static getUserDocumentsByCategory(userDocuments: UserDocument[], category: string): UserDocument[] {
    return userDocuments.filter(document => document.category === category);
  }
}

class UserTranslatedTextFactory {
  public static createUserTranslatedText(jsonObject?: any): UserTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      competenceText: jsonObject.competence_text,
      competenceTextHtml: jsonObject.competence_text_html,
      description: jsonObject.description,
      descriptionHtml: jsonObject.description_html,
      education: jsonObject.education,
      educationHtml: jsonObject.education_html,
      jobExperience: jsonObject.job_experience,
      jobExperienceHtml: jsonObject.job_experience_html,
      languageId: jsonObject.language_id,
    };
  }
}
