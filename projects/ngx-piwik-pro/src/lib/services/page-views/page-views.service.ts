import { Injectable } from '@angular/core';
import { PageViews } from '@piwikpro/tracking-base-library'

type IPageViews = typeof PageViews

@Injectable({
  providedIn: 'root'
})
export class PageViewsService {
  trackPageView(...params: Parameters<IPageViews['trackPageView']>) {
    PageViews.trackPageView(...params)
  }
}
