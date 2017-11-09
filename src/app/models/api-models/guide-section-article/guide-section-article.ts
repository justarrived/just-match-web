import {GuideSection} from '../guide-section/guide-section';
import {GuideSectionFactory} from '../guide-section/guide-section';

// API attribute interfaces
interface GuideSectionArticleApiAttributes {
  body: string;
  bodyHtml: string;
  id: string;
  languageId: string;
  shortDescription: string;
  slug: string;
  title: string;
  section: GuideSection;
  translatedText: GuideSectionArticleTranslatedTextApiAttributes;
}

interface GuideSectionArticleTranslatedTextApiAttributes {
  body: string;
  bodyHtml: string;
  languageId: string;
  shortDescription: string;
  slug: string;
  title: string;
}

// Client interfaces
export interface GuideSectionArticle extends GuideSectionArticleApiAttributes {
}

export interface GuideSectionArticleTranslatedText extends GuideSectionArticleTranslatedTextApiAttributes {
}

// Factories
export class GuideSectionArticleFactory {
  public static createGuideSectionArticle(jsonObject?: any): GuideSectionArticle {
    if (!jsonObject) {
      return;
    }

    return {
      body: jsonObject.body,
      bodyHtml: jsonObject.body_html,
      id: jsonObject.id,
      languageId: jsonObject.language_id,
      shortDescription: jsonObject.short_description,
      slug: jsonObject.slug,
      title: jsonObject.title,
      section: GuideSectionFactory.createGuideSection(jsonObject.section),
      translatedText: GuideSectionArticleTranslatedTextFactory.createGuideSectionArticleTranslatedText(jsonObject.translated_text),
    };
  }
}

class GuideSectionArticleTranslatedTextFactory {
  public static createGuideSectionArticleTranslatedText(jsonObject?: any): GuideSectionArticleTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      body: jsonObject.body,
      bodyHtml: jsonObject.body_html,
      languageId: jsonObject.language_id,
      shortDescription: jsonObject.short_description,
      slug: jsonObject.slug,
      title: jsonObject.title,
    };
  }
}
