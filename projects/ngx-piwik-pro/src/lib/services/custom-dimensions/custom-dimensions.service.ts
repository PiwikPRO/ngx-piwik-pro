import { CustomDimensions } from '@piwikpro/tracking-base-library';
import { Injectable } from '@angular/core';

type ICustomDimensions = typeof CustomDimensions;

@Injectable({
  providedIn: 'root'
})
export class CustomDimensionsService {
  deleteCustomDimension(customDimensionId: string) {
    CustomDimensions.deleteCustomDimension(customDimensionId);
  }
  getCustomDimensionValue(customDimensionId: string | number): Promise<string | undefined> {
    return CustomDimensions.getCustomDimensionValue(customDimensionId);
  }
  setCustomDimensionValue(...params: Parameters<ICustomDimensions['setCustomDimensionValue']>) {
    CustomDimensions.setCustomDimensionValue(...params);
  }
}
