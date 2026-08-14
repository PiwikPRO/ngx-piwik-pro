import { ErrorTracking } from '@piwikpro/tracking-base-library';
import { Injectable } from '@angular/core';

type IErrorTracking = typeof ErrorTracking;

@Injectable({
  providedIn: 'root',
})
export class ErrorTrackingService {
  enableJSErrorTracking(...params: Parameters<IErrorTracking['enableJSErrorTracking']>) {
    ErrorTracking.enableJSErrorTracking(...params);
  }
  trackError(...params: Parameters<IErrorTracking['trackError']>) {
    ErrorTracking.trackError(...params);
  }
}
