import { Injectable } from '@angular/core';
import { PaqService } from '../../services/paq/paq.service';
import { TRACK_EVENT } from '../../constants/track-event.constant';

@Injectable({
  providedIn: 'root'
})
export class PageViewsService {
  constructor(
    private readonly paqService: PaqService
  ) {}

  trackPageView(customPageTitle?: string) {
    this.paqService.push([
      TRACK_EVENT.PAGE_VIEW,
      ...(customPageTitle ? [customPageTitle] : [])
    ]);
  }
}
