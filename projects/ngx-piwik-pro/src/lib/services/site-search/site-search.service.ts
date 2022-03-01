import { Injectable } from '@angular/core';
import { PaqService } from '../../services/paq/paq.service';
import { TRACK_EVENT } from '../../constants/track-event.constant';

@Injectable({
  providedIn: 'root'
})
export class SiteSearchService {

  constructor(
    private readonly paqService: PaqService
  ) {}

  trackSiteSearch(keyword: string, category?: string, searchCount?: number, dimensions?: Object) {
    this.paqService.push([
      TRACK_EVENT.SEARCH,
      keyword,
      category,
      searchCount,
      dimensions
    ])
  }
}
