import { ContentTracking } from '@piwikpro/tracking-base-library'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentTrackingService {
  trackAllContentImpressions() {
    ContentTracking.trackAllContentImpressions();
  }

  trackVisibleContentImpressions(checkOnScroll = true, watchInterval = 750) {
    ContentTracking.trackVisibleContentImpressions(checkOnScroll, watchInterval);
  }

  trackContentImpressionsWithinNode(domNode: Node) {
    ContentTracking.trackContentImpressionsWithinNode(domNode);
  }

  trackContentImpression(contentName: string, contentPiece: string, contentTarget: string) {
    ContentTracking.trackContentImpression(contentName, contentPiece, contentTarget);
  }

  logAllContentBlocksOnPage(): void {
    ContentTracking.logAllContentBlocksOnPage();
  }

  trackContentInteractionNode(domNode: Node, contentInteraction = 'Unknown') {
    ContentTracking.trackContentInteractionNode(domNode, contentInteraction);
  }

  trackContentInteraction(contentInteraction: string, contentName: string, contentPiece: string, contentTarget: string) {
    ContentTracking.trackContentInteraction(contentInteraction, contentName, contentPiece, contentTarget);
  }
}
