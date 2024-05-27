import { Injectable } from '@angular/core';
import { PageViews } from '@piwikpro/tracking-base-library'

@Injectable({
  providedIn: 'root'
})
export class PageViewsService {
  trackPageView(customPageTitle?: string) {
    PageViews.trackPageView(customPageTitle)
  }
}
