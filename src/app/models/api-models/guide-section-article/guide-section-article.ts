// API attribute interfaces
interface GuideSectionArticleApiAttributes {
  body: string;
  id: string;
  languageId: string;
  shortDescription: string;
  slug: string;
  title: string;
}

interface GuideSectionArticleTranslatedTextApiAttributes {
  body: string;
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
      id: jsonObject.id,
      languageId: jsonObject.language_id,
      shortDescription: jsonObject.short_description,
      slug: jsonObject.slug,
      title: jsonObject.title,
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
      languageId: jsonObject.language_id,
      shortDescription: jsonObject.short_description,
      slug: jsonObject.slug,
      title: jsonObject.title,
    };
  }
}
