import { CustomEvent } from '@piwikpro/tracking-base-library'
import { Injectable } from '@angular/core';

type ICustomEvent = typeof CustomEvent;

@Injectable({
  providedIn: 'root'
})
export class CustomEventsService {
  trackEvent(...params: Parameters<ICustomEvent['trackEvent']>) {
    CustomEvent.trackEvent(...params)
  }
}
