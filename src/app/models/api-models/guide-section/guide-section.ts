import {GuideSectionArticle} from '../guide-section-article/guide-section-article';
import {GuideSectionArticleFactory} from '../guide-section-article/guide-section-article';
import {map} from 'lodash';

// API attribute interfaces
interface GuideSectionApiAttributes {
  articles: GuideSectionArticle[];
  id: string;
  languageId: string;
  shortDescription: string;
  slug: string;
  title: string;
  translatedText: GuideSectionTranslatedTextApiAttributes;
}

interface GuideSectionTranslatedTextApiAttributes {
  languageId: string;
  shortDescription: string;
  slug: string;
  title: string;
}

// Client interfaces
export interface GuideSection extends GuideSectionApiAttributes {
}

export interface GuideSectionTranslatedText extends GuideSectionTranslatedTextApiAttributes {
}

// Factories
export class GuideSectionFactory {
  public static createGuideSection(jsonObject?: any): GuideSection {
    if (!jsonObject) {
      return;
    }

    return {
      articles: map(jsonObject.articles, article => GuideSectionArticleFactory.createGuideSectionArticle(article)),
      id: jsonObject.id,
      languageId: jsonObject.language_id,
      shortDescription: jsonObject.short_description,
      slug: jsonObject.slug,
      title: jsonObject.title,
      translatedText: GuideSectionTranslatedTextFactory.createGuideSectionTranslatedText(jsonObject.translated_text),
    };
  }
}

class GuideSectionTranslatedTextFactory {
  public static createGuideSectionTranslatedText(jsonObject?: any): GuideSectionTranslatedText {
    if (!jsonObject) {
      return;
    }

    return {
      languageId: jsonObject.language_id,
      shortDescription: jsonObject.short_description,
      slug: jsonObject.slug,
      title: jsonObject.title,
    };
  }
}
