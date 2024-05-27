import { CustomDimensions } from '@piwikpro/tracking-base-library';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomDimensionsService {
  setCustomDimensionValue(customDimensionId: string | number, customDimensionValue: string) {
    CustomDimensions.setCustomDimensionValue(customDimensionId, customDimensionValue);
  }

  deleteCustomDimension(customDimensionId: string) {
    CustomDimensions.deleteCustomDimension(customDimensionId);
  }

  getCustomDimensionValue(customDimensionId: string | number): Promise<string | undefined> {
    return CustomDimensions.getCustomDimensionValue(customDimensionId);
  }
}
