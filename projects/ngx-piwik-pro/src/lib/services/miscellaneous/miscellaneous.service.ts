import { Miscellaneous } from '@piwikpro/tracking-base-library';
import { Injectable } from '@angular/core';

type IMiscellaneous = typeof Miscellaneous;

@Injectable({
  providedIn: 'root',
})
export class MiscellaneousService {
  setTrackingSourceProvider(
    ...params: Parameters<IMiscellaneous['setTrackingSourceProvider']>
  ) {
    Miscellaneous.setTrackingSourceProvider(...params);
  }
}
