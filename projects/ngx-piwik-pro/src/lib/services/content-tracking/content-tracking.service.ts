import { Injectable } from '@angular/core';
import { ContentTracking } from '@piwik-pro/tracking-base-library';

type IContentTracking = typeof ContentTracking;

@Injectable({
  providedIn: 'root',
})
export class ContentTrackingService implements IContentTracking {
  trackAllContentImpressions(
    ...params: Parameters<IContentTracking['trackAllContentImpressions']>
  ) {
    ContentTracking.trackAllContentImpressions(...params);
  }

  trackVisibleContentImpressions(
    ...params: Parameters<IContentTracking['trackVisibleContentImpressions']>
  ) {
    ContentTracking.trackVisibleContentImpressions(...params);
  }

  trackContentImpressionsWithinNode(
    ...params: Parameters<IContentTracking['trackContentImpressionsWithinNode']>
  ) {
    ContentTracking.trackContentImpressionsWithinNode(...params);
  }

  trackContentImpression(
    ...params: Parameters<IContentTracking['trackContentImpression']>
  ) {
    ContentTracking.trackContentImpression(...params);
  }

  logAllContentBlocksOnPage(
    ...params: Parameters<IContentTracking['logAllContentBlocksOnPage']>
  ): void {
    ContentTracking.logAllContentBlocksOnPage(...params);
  }

  trackContentInteractionNode(
    ...params: Parameters<IContentTracking['trackContentInteractionNode']>
  ) {
    ContentTracking.trackContentInteractionNode(...params);
  }

  trackContentInteraction(
    ...params: Parameters<IContentTracking['trackContentInteraction']>
  ) {
    ContentTracking.trackContentInteraction(...params);
  }
}
