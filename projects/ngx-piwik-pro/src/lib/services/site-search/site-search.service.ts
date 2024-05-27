import { Dimensions, SiteSearch } from '@piwikpro/tracking-base-library'

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SiteSearchService {
  trackSiteSearch(keyword: string, category?: string, searchCount?: number, dimensions?: Dimensions) {
    SiteSearch.trackSiteSearch(keyword, category, searchCount, dimensions)
  }
}
