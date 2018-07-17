import {Company} from '../company/company';
import {CompanyFactory} from '../company/company';
import {Country} from '../country/country';
import {Language} from '../language/language';
import {LanguageFactory} from '../language/language';
import {map} from 'lodash';
import {MissingUserTraits} from '../missing-user-traits/missing-user-traits';
import {Skill} from '../skill/skill';
import {SkillFactory} from '../skill/skill';
import {UserDocument} from '../user-document/user-document';
import {UserDocumentFactory} from '../user-document/user-document';
import {UserImage} from '../user-image/user-image';
import {UserImageFactory} from '../user-image/user-image';
import {UserInterest} from '../user-interest/user-interest';
import {UserInterestFactory} from '../user-interest/user-interest';
import {UserLanguage} from '../user-language/user-language';
import {UserLanguageFactory} from '../user-language/user-language';
import {UserOccupation} from '../user-occupation/user-occupation';
import {UserOccupationFactory} from '../user-occupation/user-occupation';
import {UserSkill} from '../user-skill/user-skill';
import {UserSkillFactory} from '../user-skill/user-skill';

// API attribute interfaces
interface UserApiAttributes {
  admin: boolean;
  anonymized: boolean;
  arrivedAt: Date;
  atUnd: string;
  bankAccount: string;
  city: string;
  company: Company;
  competenceText: string;
  competenceTextHtml: string;
  countryOfOrigin: string;
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
  language: Language;
  languageId: string;
  languages: Language[];
  lastName: string;
  latitude: number;
  linkedinUrl: string;
  longitude: number;
  name: string;
  phone: string;
  primaryRole: string;
  skills: Skill[];
  ssn: string;
  street: string;
  supportChatActivated: boolean;
  systemLanguage: Language;
  translatedText: UserTranslatedText;
  updatedAt: Date;
  userDocuments: UserDocument[];
  userImages: UserImage[];
  userInterests: UserInterest[];
  userLanguages: UserLanguage[];
  userOccupations: UserOccupation[];
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
  missingPaymentInformation: MissingUserTraits;
  personalIdImage: UserImage;
  personalLetterDocuments: UserDocument[];
  profileImage: UserImage;
  recruiterProfileImage: UserImage;
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
    const missingPaymentInformation = UserFactory.getMissingPaymentInformation(jsonObject);

    return {
      admin: jsonObject.admin,
      anonymized: jsonObject.anonymized,
      arrivedAt: new Date(jsonObject.arrived_at),
      atUnd: jsonObject.at_und,
      bankAccount: jsonObject.bank_account,
      city: jsonObject.city,
      company: CompanyFactory.createCompany(jsonObject.company),
      competenceText: jsonObject.competence_text,
      competenceTextHtml: jsonObject.competence_text_html,
      countryOfOrigin: jsonObject.country_of_origin,
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
      languages: map(jsonObject.languages, language => LanguageFactory.createLanguage(language)),
      lastName: jsonObject.last_name,
      latitude: jsonObject.latitude,
      linkedinUrl: jsonObject.linkedin_url,
      lmaCardImage: UserFactory.getUserImageByCategory(userImages, 'lma_card'),
      longitude: jsonObject.longitude,
      missingPaymentInformation: missingPaymentInformation,
      name: jsonObject.name,
      personalIdImage: UserFactory.getUserImageByCategory(userImages, 'personal_id'),
      personalLetterDocuments: UserFactory.getUserDocumentsByCategory(userDocuments, 'personal_letter'),
      phone: jsonObject.phone,
      primaryRole: jsonObject.primary_role,
      profileImage: UserFactory.getUserImageByCategory(userImages, 'profile'),
      recruiterProfileImage: UserFactory.getUserImageByCategory(userImages, 'recruiter_profile'),
      residencePermitBackImage: UserFactory.getUserImageByCategory(userImages, 'residence_permit_back'),
      residencePermitFrontImage: UserFactory.getUserImageByCategory(userImages, 'residence_permit_front'),
      skatteverketCertificateImage: UserFactory.getUserImageByCategory(userImages, 'skatteverket_certificate'),
      skills: map(jsonObject.skills, skill => SkillFactory.createSkill(skill)),
      ssn: jsonObject.ssn,
      street: jsonObject.street,
      supportChatActivated: jsonObject.support_chat_activated,
      systemLanguage: LanguageFactory.createLanguage(jsonObject.system_language),
      translatedText: UserTranslatedTextFactory.createUserTranslatedText(jsonObject.translated_text),
      updatedAt: new Date(jsonObject.updated_at),
      userDocuments: userDocuments,
      userImages: userImages,
      userInterests: map(jsonObject.user_interests, userInterest => UserInterestFactory.createUserInterest(userInterest)),
      userLanguages: map(jsonObject.user_languages, userLanguage => UserLanguageFactory.createUserLanguage(userLanguage)),
      userOccupations: map(jsonObject.user_occupations, userOccupation => UserOccupationFactory.createUserOccupation(userOccupation)),
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

  private static getMissingPaymentInformation(jsonObject: any): MissingUserTraits {
    let missingPaymentInformation = {};
    if (!jsonObject.bank_account) {
      missingPaymentInformation['bank_account'] = {};
    }
    if (!jsonObject.city) {
      missingPaymentInformation['city'] = {};
    }
    if (!jsonObject.street) {
      missingPaymentInformation['street'] = {};
    }
    if (!jsonObject.zip) {
      missingPaymentInformation['zip'] = {};
    }
    return missingPaymentInformation;
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
