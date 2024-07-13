import { GoalConversions } from '@piwikpro/tracking-base-library'
import { Injectable } from '@angular/core';

type IGoalConversions = typeof GoalConversions;

@Injectable({
  providedIn: 'root'
})
export class GoalConversionsService {
  trackGoal( ...params: Parameters<IGoalConversions['trackGoal']>) {
    GoalConversions.trackGoal(...params)
  }
}
