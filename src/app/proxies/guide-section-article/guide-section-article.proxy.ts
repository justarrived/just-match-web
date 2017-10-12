import {ApiCallService} from '../../services/api-call.service';
import {GuideSectionArticle} from '../../models/api-models/guide-section-article/guide-section-article';
import {GuideSectionArticleFactory} from '../../models/api-models/guide-section-article/guide-section-article';
import {Injectable} from '@angular/core';

@Injectable()
export class GuideSectionArticleProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getGuideSectionArticle(guideSectionIdOrSlug: string, guideSectionArticleIdOrSlug: string, searchParameters?: any): Promise<GuideSectionArticle> {
    return this.apiCallService.get('guides/sections/' + guideSectionIdOrSlug + '/articles/' + guideSectionArticleIdOrSlug, searchParameters)
    .then(response => GuideSectionArticleFactory.createGuideSectionArticle(response.data));
  }

  public getGuideSectionArticles(guideSectionIdOrSlug: string, searchParameters?: any): Promise<GuideSectionArticle[]> {
    return this.apiCallService.get('guides/sections/' + guideSectionIdOrSlug, searchParameters)
    .then(response => response.data.map(guideSectionArticle => GuideSectionArticleFactory.createGuideSectionArticle(guideSectionArticle)));
  }

  public getGuideSectionArticlesWithMeta(guideSectionIdOrSlug: string, searchParameters?: any): Promise<{guideSectionArticles: GuideSectionArticle[], meta: any}> {
    return this.apiCallService.get('guides/sections/' + guideSectionIdOrSlug, searchParameters)
    .then(response => {
      return {
        guideSectionArticles: response.data.map(guideSectionArticle => GuideSectionArticleFactory.createGuideSectionArticle(guideSectionArticle)),
        meta: response.meta
      }
    });
  }
}
