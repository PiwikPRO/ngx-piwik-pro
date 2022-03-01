import { Injectable } from '@angular/core';
import { PaqService } from '../../services/paq/paq.service';
import { TRACK_EVENT } from '../../constants/track-event.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomEventsService {

  constructor(
    private readonly paqService: PaqService
  ) {}

  trackEvent(category: string, action: string, name?: string, value?: number) {
    const eventArguments: any[] = [
      category,
      action,
      ...(name ? [name] : []),
      ...(name ? [value] : []),
    ];
    this.paqService.push([TRACK_EVENT.CUSTOM_EVENT, ...eventArguments])
  }
}
