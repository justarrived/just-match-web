import {ApplicationProxy} from './application/application.proxy';
import {CategoryProxy} from './category/category.proxy';
import {ChatProxy} from './chat/chat.proxy';
import {CommentProxy} from './comment/comment.proxy';
import {CompanyProxy} from './company/company.proxy';
import {ContactProxy} from './contact/contact.proxy';
import {CountryProxy} from './country/country.proxy';
import {DocumentProxy} from './document/document.proxy';
import {FaqProxy} from './faq/faq.proxy';
import {UserGenderProxy} from './user-gender/user-gender.proxy';
import {HourlyPayProxy} from './hourly-pay/hourly-pay.proxy';
import {InterestProxy} from './interest/interest.proxy';
import {InvoiceProxy} from './invoice/invoice.proxy';
import {JobProxy} from './job/job.proxy';
import {JobSkillProxy} from './job-skill/job-skill.proxy';
import {LanguageProxy} from './language/language.proxy';
import {MessageProxy} from './message/message.proxy';
import {MissingUserTraitsProxy} from './missing-user-traits/missing-user-traits.proxy';
import {NgModule} from '@angular/core';
import {RatingProxy} from './rating/rating.proxy';
import {SkillProxy} from './skill/skill.proxy';
import {UserStatusProxy} from './user-status/user-status.proxy';
import {TermsAgreementProxy} from './terms-agreement/terms-agreement.proxy';
import {UserDocumentProxy} from './user-document/user-document.proxy';
import {UserImageCategoryProxy} from './user-image-category/user-image-category.proxy';
import {UserImageProxy} from './user-image/user-image.proxy';
import {UserInterestProxy} from './user-interest/user-interest.proxy';
import {UserLanguageProxy} from './user-language/user-language.proxy';
import {UserPasswordProxy} from './user-password/user-password.proxy';
import {UserProxy} from './user/user.proxy';
import {UserSessionProxy} from './user-session/user-session.proxy';
import {UserSkillProxy} from './user-skill/user-skill.proxy';

@NgModule({
  providers: [
    ApplicationProxy,
    CategoryProxy,
    ChatProxy,
    CommentProxy,
    CompanyProxy,
    ContactProxy,
    CountryProxy,
    DocumentProxy,
    FaqProxy,
    UserGenderProxy,
    HourlyPayProxy,
    InterestProxy,
    InvoiceProxy,
    JobProxy,
    JobSkillProxy,
    LanguageProxy,
    MessageProxy,
    MissingUserTraitsProxy,
    RatingProxy,
    SkillProxy,
    UserStatusProxy,
    TermsAgreementProxy,
    UserDocumentProxy,
    UserImageCategoryProxy,
    UserImageProxy,
    UserInterestProxy,
    UserLanguageProxy,
    UserProxy,
    UserPasswordProxy,
    UserSessionProxy,
    UserSkillProxy,
  ]
})
export class ProxiesModule {}
