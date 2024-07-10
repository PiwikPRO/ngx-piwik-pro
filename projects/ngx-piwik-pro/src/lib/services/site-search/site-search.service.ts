import { Dimensions, SiteSearch } from '@piwikpro/tracking-base-library'

import { Injectable } from '@angular/core';

type ISiteSearch = typeof SiteSearch;

@Injectable({
  providedIn: 'root'
})
export class SiteSearchService {
  trackSiteSearch(...params: Parameters<ISiteSearch['trackSiteSearch']>) {
    SiteSearch.trackSiteSearch(...params)
  }
}
