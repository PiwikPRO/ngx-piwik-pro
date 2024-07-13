import { ContentTracking } from '@piwikpro/tracking-base-library'
import { Injectable } from '@angular/core';

type IContentTracking = typeof ContentTracking;

@Injectable({
  providedIn: 'root'
})
export class ContentTrackingService {
  trackAllContentImpressions(...params: Parameters<IContentTracking['trackAllContentImpressions']>) {
    ContentTracking.trackAllContentImpressions(...params);
  }

  trackVisibleContentImpressions(...params: Parameters<IContentTracking['trackVisibleContentImpressions']>) {
    ContentTracking.trackVisibleContentImpressions(...params);
  }

  trackContentImpressionsWithinNode(...params: Parameters<IContentTracking['trackContentImpressionsWithinNode']>) {
    ContentTracking.trackContentImpressionsWithinNode(...params);
  }

  trackContentImpression(...params: Parameters<IContentTracking['trackContentImpression']>) {
    ContentTracking.trackContentImpression(...params);
  }

  logAllContentBlocksOnPage(...params: Parameters<IContentTracking['logAllContentBlocksOnPage']>){
    ContentTracking.logAllContentBlocksOnPage(...params);
  }

  trackContentInteractionNode(...params: Parameters<IContentTracking['trackContentInteractionNode']>) {
    ContentTracking.trackContentInteractionNode(...params);
  }

  trackContentInteraction(...params: Parameters<IContentTracking['trackContentInteraction']>) {
    ContentTracking.trackContentInteraction(...params);
  }
}
