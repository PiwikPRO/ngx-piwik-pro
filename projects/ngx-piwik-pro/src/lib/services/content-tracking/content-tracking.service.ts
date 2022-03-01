import { Injectable } from '@angular/core';
import { PaqService } from '../../services/paq/paq.service';
import { TRACK_EVENT } from '../../constants/track-event.constant';

@Injectable({
  providedIn: 'root'
})
export class ContentTrackingService {

  constructor(
    private readonly paqService: PaqService
  ) {}

  trackAllContentImpressions() {
    this.paqService.push([
      TRACK_EVENT.ALL_CONTENT_IMPRESSIONS
    ]);
  }

  trackVisibleContentImpressions(checkOnScroll?: boolean, watchIterval?: number) {
    this.paqService.push([
      TRACK_EVENT.VISIBLE_CONTENT_IMPRESSIONS,
      checkOnScroll,
      watchIterval,
    ]);
  }

  trackContentImpressionsWithinNode(domNode: any) {
    this.paqService.push([
      TRACK_EVENT.CONTENT_IMPRESSIONS_WITH_NODE,
      domNode
    ]);
  }

  trackContentImpression(contentName: string, contentPiece: string, contentTarget: string) {
    this.paqService.push([
      TRACK_EVENT.CONTENT_IMPRESSION,
      contentName,
      contentPiece,
      contentTarget
    ]);
  }

  logAllContentBlocksOnPage(): void {
    this.paqService.push([ TRACK_EVENT.LOG_ALL_CONTENT_BLOCKS_ON_PAGE ]);
  }

  trackContentInteractionNode(domNode: any, contentInteraction: string) {
    this.paqService.push([
      TRACK_EVENT.CONTENT_INTERACTION_NODE,
      domNode,
      contentInteraction,
    ]);
  }

  trackContentInteraction(contentInteraction: string, contentName: string, contentPiece: string, contentTarget: string) {
    this.paqService.push([
      TRACK_EVENT.CONTENT_INTERACTION,
      contentInteraction,
      contentName,
      contentPiece,
      contentTarget
    ]);
  }
}
