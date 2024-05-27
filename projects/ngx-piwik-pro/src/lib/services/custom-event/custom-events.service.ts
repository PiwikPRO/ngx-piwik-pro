import { CustomEvent } from '@piwikpro/tracking-base-library'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomEventsService {
  trackEvent(category: string, action: string, name?: string, value?: number) {
    CustomEvent.trackEvent(category, action, name, value)
  }
}
