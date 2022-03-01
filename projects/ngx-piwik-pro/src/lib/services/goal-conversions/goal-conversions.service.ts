import { Injectable } from '@angular/core';
import { PaqService } from '../../services/paq/paq.service';
import { TRACK_EVENT } from '../../constants/track-event.constant';

@Injectable({
  providedIn: 'root'
})
export class GoalConversionsService {
  constructor(
    private readonly paqService: PaqService
  ) {}

  trackGoal(goalId: number | string, conversionValue: number, dimensions?: Object) {
    this.paqService.push([
      TRACK_EVENT.GOAL,
      goalId,
      conversionValue,
      ...(dimensions ? [{ ...dimensions }] : [])
    ])
  }
}
