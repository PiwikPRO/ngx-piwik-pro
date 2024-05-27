import { Dimensions, GoalConversions } from '@piwikpro/tracking-base-library'

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoalConversionsService {
  trackGoal(goalId: number | string, conversionValue: number, dimensions?: Dimensions) {
    GoalConversions.trackGoal(goalId, conversionValue, dimensions)
  }
}
