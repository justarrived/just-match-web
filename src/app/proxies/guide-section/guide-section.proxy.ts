import {ApiCallService} from '../../services/api-call.service';
import {GuideSection} from '../../models/api-models/guide-section/guide-section';
import {GuideSectionFactory} from '../../models/api-models/guide-section/guide-section';
import {Injectable} from '@angular/core';

@Injectable()
export class GuideSectionProxy {

  constructor(
    private apiCallService: ApiCallService
  ) {
  }

  // GET
  public getGuideSection(guideSectionIdOrSlug: string, searchParameters?: any): Promise<GuideSection> {
    return this.apiCallService.get('guides/sections/' + guideSectionIdOrSlug, searchParameters)
    .then(response => GuideSectionFactory.createGuideSection(response.data));
  }

  public getGuideSections(searchParameters?: any): Promise<GuideSection[]> {
    return this.apiCallService.get('guides/sections', searchParameters)
    .then(response => response.data.map(guideSection => GuideSectionFactory.createGuideSection(guideSection)));
  }

  public getGuideSectionsWithMeta(searchParameters?: any): Promise<{guideSections: GuideSection[], meta: any}> {
    return this.apiCallService.get('guides/sections', searchParameters)
    .then(response => {
      return {
        guideSections: response.data.map(guideSection => GuideSectionFactory.createGuideSection(guideSection)),
        meta: response.meta
      }
    });
  }
}
